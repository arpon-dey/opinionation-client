import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import useSurvey from '../../../Hooks/useSurvey';
import SectionTitle from '../../../components/SectionTitle';

const Latest = () => {
  // const timeDifference = (current, previous) => {
  //   const elapsed = current - previous;
  //   const minutes = Math.round(elapsed / (1000 * 60));
  //   return `${minutes} minutes ago`;
  // }

  const timeDifference = (current, previous) => {
    const elapsed = current - previous;
    const minutes = Math.round(elapsed / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
  
    if (days > 0) {
      return `${days} days ${remainingHours} hours ${remainingMinutes} minutes ago`;
    } else if (hours > 0) {
      return `${hours} hours ${remainingMinutes} minutes ago`;
    } else {
      return `${remainingMinutes} minutes ago`;
    }
  };
  const [survey] = useSurvey()
  console.log(survey);
  const sortedSurvey = [...survey].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  const latestSurveys = sortedSurvey.slice(0, 6);

  const currentTime = new Date();
  return (
    <div>
      <SectionTitle heading='latest survey' subHeading='latest'></SectionTitle>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 '>
      {
        latestSurveys.map(item => <div className='' key={item._id}>
          <div style={{ margin: '1%' }}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt="Chevrolet"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description.slice(0, 50)}
                </Typography>
                <Typography variant="body2" color="text.secondary ">
                Added: {timeDifference(currentTime, new Date(item.timestamp))}
                </Typography>
              </CardContent>
              <CardActions>
                <Button  color="success" sx={{ paddingBottom: '20px' }}>Join survey</Button>
               
              </CardActions>
            </Card>
          </div>
        </div>)
      }

    </div>
    </div>
  );
};

export default Latest;