import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import ProposalFormSet from "./components/function/ProposalFormSet";
import UnformattedText from "./components/static/UnformattedText";
import MessageItem from "./components/static/MessageItem";
import Paper from "@material-ui/core/Paper";
import { Message } from "./types";

const HUD: React.FC = () => {
    const [message, setMessage] = useState<Message>();
    return (
        <Grid
            container
            style={{ width: "100%" }}
            alignItems="flex-start"
            justifyContent="center"
        >
            <Grid container item xs={12} sm={4}>
                <Grid item xs={12}>
                    <Paper style={{ height: "100vh", paddingTop: "21vh" }}>
                        <ProposalFormSet setMessage={setMessage} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container item xs={12} sm={4}>
                <Grid item xs={12}>
                    <Paper style={{ height: "100vh", paddingTop: "25vh" }}>
                        <UnformattedText message={message} />
                    </Paper>
                </Grid>
            </Grid>
            <Grid container item xs={12} sm={4}>
                <Grid item xs={12}>
                    <Paper style={{ height: "100vh", paddingTop: "25vh" }}>
                        <MessageItem message={message} />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default HUD;
