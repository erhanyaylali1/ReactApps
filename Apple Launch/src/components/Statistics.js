import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Statistic } from 'semantic-ui-react'
import CountUp from 'react-countup'
import VisibilitySensor from 'react-visibility-sensor';

const Statistics = () => {
	
	const classes = useStyle()

	return (
    <Grid container justifyContent="center" className={classes.statistic}>
      <Statistic>
        <Statistic.Value>
          <CountUp
            start={0}
            end={218012463}
            separator=","
            redraw={true}
            duration={4}
          >
            {({ countUpRef, start }) => (
              <VisibilitySensor onChange={start} delayedCall>
                <span ref={countUpRef} />
              </VisibilitySensor>
            )}
          </CountUp>
        </Statistic.Value>
        <Statistic.Label className={classes.label}>Iphone User</Statistic.Label>
      </Statistic>
    </Grid>
  );
}

export default Statistics

const useStyle = makeStyles({	
	statistic: {
		marginBottom: '50px'
	},
	label: {

	}
})