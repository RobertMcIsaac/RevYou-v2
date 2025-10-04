import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schema/project.schema';

@Module({
  providers: [ProjectService],
  controllers: [],
  exports: [ProjectService],
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
})
export class ProjectModule {}
