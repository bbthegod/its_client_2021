/*
 *
 * QuestionList
 *
 */
import { Button, Grid } from '@mui/material';
import classes from './styles.module.css';

interface Props {
  playData: PlayData;
  selectQuestion: Function;
}

export default function QuestionList({ playData, selectQuestion }: Props) {
  return (
    <Grid container spacing={1}>
      {playData?.questions?.map((item, idx) => (
        <Grid item xs={3} key={item._id}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => selectQuestion(idx)}
            key={idx}
            color={item.answered ? 'secondary' : 'primary'}
          >
            {idx + 1}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
}
