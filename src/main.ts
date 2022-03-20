import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {PrismaService} from 'src/prisma.service';

    async function start() {

        const PORT =process.env.PORT || 5555;
const app = await NestFactory.create(AppModule)

await app.listen(PORT, () => console.log(`Server started on = ${PORT}`))

    }
    start()

