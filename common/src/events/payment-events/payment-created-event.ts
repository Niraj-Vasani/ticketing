import { Subjects } from "../event-subjects/subjects";

export interface PaymentCreatedEvent {
    subject: Subjects.PaymentCreated;
    data: {
        id: string;
        orderId: string;
        stripeId: string;
    }
}