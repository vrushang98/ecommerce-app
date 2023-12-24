import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultRoles1703417489562 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "public"."role" ("id", "permissions", "created_at", "updated_at", "role_name") VALUES
('09eced88-9307-4d0e-a588-a9a9495a0785', '{fetch,delete}', '2023-12-24 17:00:44.095921', '2023-12-24 17:00:44.095921', 'supporter'),
('4253d80f-e8c0-4311-8156-03787b20c7a3', '{all}', '2023-12-24 16:59:41.479878', '2023-12-24 16:59:41.479878', 'admin'),
('b1371de3-5516-4b27-a2d1-41bee74f5f3f', '{fetch}', '2023-12-24 17:00:53.832493', '2023-12-24 17:00:53.832493', 'customer'),
('e9f093fc-ad69-4ece-a57c-deee5fa78a4c', '{fetch,create,update}', '2023-12-24 17:00:23.674977', '2023-12-24 17:00:23.674977', 'seller');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    console.log('Nothing to Revert Here');
  }
}
