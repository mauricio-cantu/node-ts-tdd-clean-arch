import { PrismaClient } from '@prisma/client';

export class SingletonPrismaClient {
  private static instance: PrismaClient;

  public static getInstance (): PrismaClient {
    if(!SingletonPrismaClient.instance) {
      SingletonPrismaClient.instance = new PrismaClient();
    }
    return SingletonPrismaClient.instance;
  }
}

export default SingletonPrismaClient.getInstance();