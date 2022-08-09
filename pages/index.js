import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";


const HomePage = (props) => {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta
                    name="description"
                    content="Browse about all the react meetups that are happening"
                ></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );
};


export async function getStaticProps() {
    //  fetch data from db or API

    const client = await MongoClient.connect(
        "mongodb+srv://darkInvader:GcMS1s0brifU9o7P@cluster0.tgfps.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find().toArray();
    client.close();
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                image: meetup.image,
                id: meetup._id.toString(),
                address: meetup.address,
            })),
        },
        revalidate: 1,
    };
}
export default HomePage;
