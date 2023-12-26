import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { fixtureTrees } from '../fixture/fixture';

export interface IEntity {
  name: string;
  tableName: string;
  order: number;
}

@Injectable()
export class TestService {
  connectionManager: EntityManager;
  constructor(public dataSource: DataSource) {
    if (process.env.NODE_ENV !== 'automated-tests') {
      console.log(process.env.NODE_ENV);
      // throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }

    this.connectionManager = this.dataSource.createEntityManager();
  }

  async loadAll(entities: IEntity[]): Promise<void> {
    for (const entity of entities.sort((a, b) => a.order - b.order)) {
      try {
        const repository =  this.connectionManager.getRepository(
          entity.name,
        );

        const items = fixtureTrees[entity.name];

        await repository
          .createQueryBuilder(entity.name)
          .insert()
          .values(items)
          .execute();
      } catch (error) {
        // Entity not included in the fixtures. But this should not be necessary!
        throw new Error(
          `ERROR [TestUtils.loadAll()]: Loading fixtures on test db: ${error}`,
        );
      }
    }
  }

  async getEntities(): Promise<IEntity[]> {
    const entities = [];
    (await (await this.connectionManager.connection).entityMetadatas).forEach(
      (x) =>
        entities.push({
          name: x.name,
          tableName: x.tableName,
          order: this.getOrder(x.name),
        }),
    );

    return entities;
  }

  getOrder(entityName): number {
    return Object.keys(fixtureTrees).indexOf(entityName);
}
}
