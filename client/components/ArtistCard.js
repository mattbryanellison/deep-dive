import React from "react";
import {
  Grid,
  CardContent,
  Avatar,
  Card,
  Typography,
  Button,
} from "@material-ui/core";

const ArtistCard = (props) => {
  const linkToArtistPage = (e) => {
    window.open(props.diveResults.external_urls.spotify, "_blank");
  };
  return (
    <Card>
      <Button onClick={linkToArtistPage}>
        <CardContent justify="center">
          <Grid
            align="center"
            container
            direction="column"
            justify="center"
            spacing={0}
          >
            <Grid item xs={12}>
              <Avatar
                style={{ width: "75%", height: "75%" }}
                src={
                  props.diveResults.images[0]
                    ? props.diveResults.images[0].url
                    : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">{props.diveResults.name}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Button>
    </Card>
  );
};

export default ArtistCard;
