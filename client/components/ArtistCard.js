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
  const styles = {
    card: {
      backgroundColor: "#0e0e0e",
    },
  };
  const linkToArtistPage = (e) => {
    window.open(props.artist.external_urls.spotify, "_blank");
  };
  return (
    <Card elevation={7} style={styles.card}>
      <CardContent justify="center">
        <Button onClick={linkToArtistPage}>
          <Grid
            align="center"
            container
            direction="column"
            justify="center"
            spacing={0}
          >
            <Grid item xs={12}>
              <Avatar
                variant="rounded"
                style={{ width: "75%", height: "75%" }}
                src={props.artist.images[0] ? props.artist.images[0].url : null}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h2">{props.artist.name}</Typography>
            </Grid>
          </Grid>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
