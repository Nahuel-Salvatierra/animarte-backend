import { Module } from "@nestjs/common";
import { TestService } from "./app/service/test.service";

@Module({
  providers:[TestService],
  exports:[TestService]
})
export class TestModule{}