import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private directionsService: DirectionsService) {}

  @Get()
  getDirections(
    @Query('originId') placeOriginId: string,
    @Query('destinationId') placeDestinationId: string,
  ) {
    return this.directionsService.getDirections(
      placeOriginId,
      placeDestinationId,
    );
  }
}
