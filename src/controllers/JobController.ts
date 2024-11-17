import { Request, Response, RequestHandler } from 'express';
import { Job } from '../models/Job';

export class JobController {
  public getJobs: RequestHandler = async (req: Request, res: Response) => {
    try {
      const jobs = await Job.findAll();
      res.status(200).json({
        success: true,
        data: jobs,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching jobs',
      });
    }
  };

  public createJob: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { title, description, status } = req.body;

      const newJob = await Job.create({
        title,
        description,
        status,
      });

      res.status(201).json({
        success: true,
        data: newJob,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating job',
      });
    }
  };

  public updateJob: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, status } = req.body;

      const job = await Job.findByPk(id);

      if (!job) {
        res.status(404).json({
          success: false,
          message: 'Job not found',
        });
        return;
      }

      await job.update({
        title,
        description,
        status,
      });

      res.status(200).json({
        success: true,
        data: job,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating job',
      });
    }
  };

  public deleteJob: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const job = await Job.findByPk(id);
  
      if (!job) {
        res.status(404).json({
          success: false,
          message: 'Job not found',
        });
        return;
      }
  
      await job.destroy();
  
      res.status(200).json({
        success: true,
        message: 'Job deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting job',
      });
    }
  };
}
