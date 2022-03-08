import { ReactElement } from 'react';
import { TicketsLayout } from '@/components/Layouts/Tickets/Tickets';

const TicketPage = () => <div>Ticket</div>;

TicketPage.getLayout = (page: ReactElement) => (
  <TicketsLayout>{page}</TicketsLayout>
);
export default TicketPage;
