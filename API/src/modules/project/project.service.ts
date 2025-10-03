import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './schema/project.schema';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { escapeRegex } from '@/common/helper/escape-regex.helper';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findOrCreateProjects(projects: CreateProjectDto[]) {
    const projectDocs = await Promise.all(
      projects.map((project) =>
        this.projectModel
          .findOneAndUpdate(
            { title: project.title },
            { $setOnInsert: { ...project } },
            { new: true, upsert: true },
          )
          .select('_id')
          .exec(),
      ),
    );
    const projectIds: Types.ObjectId[] = projectDocs.map((doc) => doc._id);
    return projectIds;
  }

  async searchProjectsByTitle(partialTitle: string): Promise<Project[]> {
    return this.projectModel
      .find({
        title: { $regex: escapeRegex(partialTitle), $options: 'i' },
      })
      .limit(10);
  }
}
