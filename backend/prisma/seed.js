import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { PrismaClient, Role, TaskPriority, TaskStatus } from '@prisma/client';
dotenv.config();
const prisma = new PrismaClient();
async function main() {
    const email = process.env.SEED_ADMIN_EMAIL ?? 'admin@teamboard.dev';
    const password = process.env.SEED_ADMIN_PASSWORD ?? 'Admin123*';
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
            name: 'Admin Demo',
            email,
            passwordHash,
            role: Role.ADMIN,
        },
    });
    const member = await prisma.user.upsert({
        where: { email: 'member@teamboard.dev' },
        update: {},
        create: {
            name: 'Member Demo',
            email: 'member@teamboard.dev',
            passwordHash: await bcrypt.hash('Member123*', 10),
            role: Role.MEMBER,
        },
    });
    const count = await prisma.task.count();
    if (count === 0) {
        await prisma.task.createMany({
            data: [
                {
                    title: 'Definir backlog del sprint',
                    description: 'Organizar tareas prioritarias del equipo para la semana.',
                    status: TaskStatus.TODO,
                    priority: TaskPriority.HIGH,
                    assignedToId: admin.id,
                    createdById: admin.id,
                },
                {
                    title: 'Diseñar dashboard responsive',
                    description: 'Ajustar layout mobile y desktop del tablero principal.',
                    status: TaskStatus.IN_PROGRESS,
                    priority: TaskPriority.MEDIUM,
                    assignedToId: member.id,
                    createdById: admin.id,
                },
                {
                    title: 'Preparar demo funcional',
                    description: 'Validar flujo completo de auth y gestión de tareas.',
                    status: TaskStatus.DONE,
                    priority: TaskPriority.LOW,
                    assignedToId: member.id,
                    createdById: admin.id,
                },
            ],
        });
    }
    console.log('Seed completado');
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
