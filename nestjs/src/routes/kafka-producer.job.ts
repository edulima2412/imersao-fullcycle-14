import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Processor('kafka-producer')
export class KafkaProducerJob {
  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaService: ClientKafka,
  ) {}

  @Process()
  async handle(job: Job<any>) {
    await this.kafkaService.emit('routes', job.data);
    return {};
  }
}
