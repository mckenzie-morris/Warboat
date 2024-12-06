import { Button } from '@mui/base/Button';
import { Link } from 'react-router';

function Home() {
  return (
    <div>
      <h1 className='text-9xl'>Home</h1>
      <Link to='/options'>
        <Button className='bg-green-600 rounded-md py-1 px-4'>
          Options Page
        </Button>
      </Link>
    </div>
  );
}

export default Home;
