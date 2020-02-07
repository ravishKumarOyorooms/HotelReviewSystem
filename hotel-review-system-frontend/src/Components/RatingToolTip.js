import React from "react";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import {Grid,CssBaseline, Typography} from '@material-ui/core/';


class RatingToolTip extends React.Component {
  state = {
    food: 4,
    service: 4,
    locality: 3,
    cleanliness: 4.5,
    security: 4,
    accessiblity: 5,
    avgValueforMoney: 5
  };

  render() {
    const rate=this.props.ratings;
    //console.log("Rate=",rate);
    return (
      
      
      <div style={{ height: "auto", width: "250px", color:"black" , backgroundColor:"white"}}>
        <Grid container spacing={.5}>
          <Grid item xs={4} > <Typography >Food:&nbsp; </Typography></Grid>
          <Grid item xs={8} > <Progress  percent={rate.avgFood * 20}  /> </Grid>
        </Grid>

        <Grid container spacing={0.5}>
          <Grid item xs={4} > <Typography >Service:&nbsp; </Typography></Grid>
          <Grid item xs={8} > <Progress  percent={rate.avgService * 20}   /> </Grid>
        </Grid>

        <Grid container spacing={.25}>
          <Grid item xs={4} > <Typography >Locality:&nbsp; </Typography></Grid>
          <Grid item xs={8} > <Progress percent={rate.avgLocality * 20}  /> </Grid>
        </Grid>
        
        <Grid container spacing={.25}>
          <Grid item xs={5} > <Typography >Cleanliness:&nbsp; </Typography></Grid>
          <Grid item xs={7} > <Progress percent={rate.avgCleanliness * 20}   />  </Grid>
        </Grid>
        

        <Grid container spacing={.5}>
          <Grid item xs={4} > <Typography >Security:&nbsp; </Typography></Grid>
          <Grid item xs={8} >  <Progress percent={rate.avgSecurity * 20}   /> </Grid>
        </Grid>
        

        <Grid container spacing={.5}>
          <Grid item xs={6} > <Typography >Value&nbsp;For&nbsp;Money </Typography></Grid>
          <Grid item xs={6} > <Progress percent={rate.avgValueForMoney * 20}    /></Grid>
        </Grid>
        

        <Grid container spacing={.5}>
          <Grid item xs={5} > <Typography >Accessibility:&nbsp; </Typography></Grid>
          <Grid item xs={7} > <Progress percent={rate.avgAccessiblity * 20}  /> </Grid>
        </Grid>
        
        
        
        
       
        
        
      </div>
    );
  }
}
export default RatingToolTip;
