import { useState, useEffect } from 'react';


const Dashboard = () => {
  const [numBlogPosts, setNumBlogPosts] = useState(0);
  const [numRefunds, setNumRefunds] = useState(0);
  const [numPaymentStatuses, setNumPaymentStatuses] = useState(0);

  useEffect(() => {
   
    const numBlogPosts = dummyPosts.length;
    const numRefunds = dummyRefunds.length;
    const numPaymentStatuses = dummyPaymentStatuses.length;
    setNumBlogPosts(numBlogPosts);
    setNumRefunds(numRefunds);
    setNumPaymentStatuses(numPaymentStatuses);
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Blog Posts: {numBlogPosts}</h2>
      
      </div>
      <div>
        <h2>Refunds: {numRefunds}</h2>
      
      </div>
      <div>
        <h2>Payment Statuses: {numPaymentStatuses}</h2>
       
      </div>
      <div>
      </div>
    </div>
  );
};

export default Dashboard;

const dummyPosts = [
  'Post 1',
  'Post 2',
  'Post 3'
];

const dummyRefunds = [
  'Refund 1',
  'Refund 2',
  'Refund 3'
];

const dummyPaymentStatuses = [
  'Pending',
  'Paid',
  'Cancelled'
];

