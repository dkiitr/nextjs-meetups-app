import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <Fragment>
            <Head>
                <title> {props.meetupData.title} </title>
                <meta
                    name="description"
                    content={props.meetupData.description}
                />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(
        "mongodb+srv://darkInvader:GcMS1s0brifU9o7P@cluster0.tgfps.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();
    return {
        fallback:"blocking",
        paths: meetups.map((meetup) => ({
            params: {
                meetupId: meetup._id.toString(),
            },
        })),
    };
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId;

    console.log(meetupId);

    const client = await MongoClient.connect(
        "mongodb+srv://darkInvader:GcMS1s0brifU9o7P@cluster0.tgfps.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    const selectedMeetups = await meetupsCollection.findOne({
        _id: ObjectId(meetupId),
    });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetups._id.toString(),
                title: selectedMeetups.title,
                address: selectedMeetups.address,
                description: selectedMeetups.description,
                image: selectedMeetups.image,
            },
        },
    };
}

export default MeetupDetails;
