import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import { Colors } from "../constants/colors";
import avatar1 from "../images/avatar1.png";
import avatar2 from "../images/avatar2.png";
import avatar3 from "../images/avatar3.png";
import avatar4 from "../images/avatar4.png";
import avatar5 from "../images/avatar5.png";
import avatar6 from "../images/avatar6.png";
import avatar7 from "../images/avatar7.png";
import avatar8 from "../images/avatar8.png";

const data = [
  { name: "Luna", role: "Team Lead, Project Manager", img: avatar1 },
  { name: "Zixuan", role: "Project Manager", img: avatar2 },
  { name: "Yiki", role: "Project Manager", img: avatar3 },
  { name: "Gary", role: "Tech, Engineer", img: avatar4 },
  { name: "Zeke", role: "Development, Engineer", img: avatar5 },
  { name: "Sora", role: "Engineer", img: avatar6 },
  { name: "Luozhida", role: "Engineer", img: avatar7 },
  { name: "Amo", role: "UI/UX Designer", img: avatar8 },
];

const Members = () => {
  return (
    <Grid container spacing={2} sx={{ backgroundColor: Colors.grey10 }}>
      {data.map((d) => {
        return (
          <Grid key={`${d.name}`} item xs={3} sx={{ padding: 2 }}>
            <Card sx={{ boxShadow: "none", padding: 2 }}>
              <img src={d.img} alt={d.name} width={"100%"} />
              <Typography variant={"h5"} fontWeight={"bold"}>
                {d.name}
              </Typography>
              <Typography color={Colors.grey20}>{d.role}</Typography>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Members;
