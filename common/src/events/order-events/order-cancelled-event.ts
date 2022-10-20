import { Subjects } from "../event-subjects/subjects";
import { OrderStatus } from "../types/order-status";

export interface OrderCancelledEvent {
    subject: Subjects.OrderCancelled;
    data: {
        id: string;
        version: number;
        ticket: {
            id: string;
        }
    }
}