import { Request, Response, RequestHandler } from 'express';
import { Job } from '../models/Job';
import { Portal } from '../models/Portal';
import { JobDocument } from '../models/JobDocument';

export class JobDocumentController {
  public uploadDocument: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id, portalId } = req.params;

      // Ensure the uploaded file exists
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No file uploaded. Please provide a valid document.',
        });
        return; // Ensure no further execution
      }

      // Validate job existence
      const job = await Job.findByPk(id);
      if (!job) {
        res.status(404).json({
          success: false,
          message: 'Job not found.',
        });
        return; // Terminate further execution
      }

      // Validate portal existence
      const portal = await Portal.findByPk(portalId);
      if (!portal) {
        res.status(404).json({
          success: false,
          message: 'Portal not found.',
        });
        return; // Terminate further execution
      }

      // Save the document to the database
      const newDocument = await JobDocument.create({
        jobId: id,
        portalId,
        documentUrl: req.file.path,
        documentType: req.file.mimetype.split('/')[1], // Extract file type (pdf, doc, etc.)
      });

      res.status(201).json({
        success: true,
        data: newDocument,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error uploading document.',
      });
    }
  };
}
