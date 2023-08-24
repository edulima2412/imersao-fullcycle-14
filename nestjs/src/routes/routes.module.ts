import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { MapsModule } from 'src/maps/maps.module';

import { RoutesDriverService } from './routes-driver/routes-driver.service';
import { RoutesGateway } from './routes/routes.gateway';
import { BullModule } from '@nestjs/bull';
import { NewPointsJob } from './new-points.job';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerJob } from './kafka-producer.job';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    MapsModule,
    BullModule.registerQueue(
      { name: 'new-points' },
      { name: 'kafka-producer' },
    ),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest',
            brokers: ['host.docker.internal:9094'],
          },
        },
      },
    ]),
  ],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    RoutesDriverService,
    RoutesGateway,
    NewPointsJob,
    KafkaProducerJob,
    makeCounterProvider({
      name: 'route_started_counter',
      help: 'Numero de rotas iniciadas',
    }),
    makeCounterProvider({
      name: 'route_finished_counter',
      help: 'Numero de rotas finalizadas',
    }),
  ],
})
export class RoutesModule {}
