import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultUsers1703420408439 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "public"."user" ("id", "password", "created_at", "updated_at", "email_address", "role_id") VALUES
    ('008dc546-e33c-4a73-94b7-5dc2ee88d9d0', '$2b$10$1xyScJA2gryaRlfV8rZLAuzy6MzTFwOdxiyEzHbVYVgp2nJNn1Dl6', '2023-12-24 17:42:19.345856', '2023-12-24 17:42:19.345856', 'admin@gmail.com', '4253d80f-e8c0-4311-8156-03787b20c7a3'),
    ('6b9d9b2c-c62d-43b3-aa18-98815ab65f75', '$2b$10$uC0Vfnc6H4ZgZEPXVnpcWePNUyyCuOoSPg2J1LsorPfvHfXPm/7JO', '2023-12-24 17:42:10.083951', '2023-12-24 17:42:10.083951', 'customer@gmail.com', 'b1371de3-5516-4b27-a2d1-41bee74f5f3f');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Nothing to Revert Here');
  }
}
