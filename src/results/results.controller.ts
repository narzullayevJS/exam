import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ResultsService } from './results.service';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('results')
@UseGuards(JwtAuthGuard)
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get()
  findMyResults(@Req() req) {
    return this.resultsService.findForUser(req.user);
  }
}
