import { Button } from '@mui/base/Button';
import { Link } from 'react-router';

function Home() {
  return (
    <div className='flex flex-col items-center justify-evenly h-screen'>
      <h1 className='text-9xl'>Home</h1>

      <Link to='/game'>
        <Button className='bg-green-600 rounded-md py-1 px-4'>
          Start Game
        </Button>
      </Link>

      <Link to='/options'>
        <Button className='bg-green-600 rounded-md py-1 px-4'>
          Options
        </Button>
      </Link>

      <Link to='/leaderboard'>
        <Button className='bg-green-600 rounded-md py-1 px-4'>
          Leaderboard
        </Button>
      </Link>

      <Link to='/login'>
        <Button className='bg-green-600 rounded-md py-1 px-4'>
          Login
        </Button>
      </Link>

    </div>
  );
}

export default Home;
