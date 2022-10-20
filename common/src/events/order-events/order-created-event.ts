import { Subjects } from "../event-subjects/subjects";
import { OrderStatus } from "../types/order-status";

export interface OrderCreatedEvent {
    subject: Subjects.OrderCretaed;
    data: {
        id: string;
        version: number;
        status: OrderStatus;
        userId: string;
        expiresAt: string;
        ticket: {
            id: string;
            price: number;
        }
    }
}