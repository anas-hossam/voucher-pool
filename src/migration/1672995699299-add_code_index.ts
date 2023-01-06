import {MigrationInterface, QueryRunner} from "typeorm";

export class addCodeIndex1672995699299 implements MigrationInterface {
    name = 'addCodeIndex1672995699299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "code_index" ON "voucher" ("code") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."code_index"`);
    }

}
