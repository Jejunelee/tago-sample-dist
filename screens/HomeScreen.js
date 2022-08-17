import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import tw from "tailwind-rn";
import BottomNavi from "./BottomNavi";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import useAuth from "../hooks/useAuth";

//importing icons that come preinstalled in expo
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "@firebase/firestore";
import { db } from "../firebase";
import generateId from "../lib/generateId";


const HomeScreen2 = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  // console.log(user);
  const swipeRef = useRef(null);

  //for mapping on the cards, replacing the DUMMY_DATA with the data from the database
  const [profiles, setProfiles] = useState([]);

  //when components paints on screen, refactor/use useffect can also be used
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        //if personal details not filled, prompt the MODAL SCREEN
        // TODO    user.uid = for the user who has logged in
        // const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        // console.log(
        //   "````````````````Snapshot:`````````````````````````",
        //   snapshot
        // );

        if (!snapshot.exists()) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      //fetch previously NOPED cards
      //this is not realtime, since rfor that we use onSnapshot and not getDocs

      //TODO await THESE MFs
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then(
        //this is IMPLICIT RETURN THAT'S WHY NO BRACKETS USED BELOW
        (snapshot) => snapshot.docs.map((doc) => doc.id) //all IDs of the passes/nopes are mapped into passes array
      );
      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      //TODO when QUERYING on DB, cant pass EMPTY ARRAY, value is required!
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      // console.log("NOPED followed by Right SWIPED", [
      //   passedUserIds,
      //   swipedUserIds,
      // ]);

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds, ...swipedUserIds])
        ), //[...] because we adding swiped/YES IDS as well, so remove swiped people ALL IN ALL
        (snapshot) => {
          setProfiles(
            //map through the array and build object

            //before the map, filter the USER that is logged in here
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();

    return unsub;
  }, [db]);

  // console.log("Profiles:", profiles);

  const swipeLeft = (cardIndex) => {
    //adds record in THEIR
    if (!profiles[cardIndex]) return;
    //if swiped on card, if card isnt in profiles[], dont interact with DB

    const userSwiped = profiles[cardIndex];
    // console.log(`You swiped NOOPE on ${userSwiped.displayName}`);

    //TODO go into the database->users->userID->passes/NOPES collection of this particular user->userSwiped ki ID
    setDoc(
      doc(db, "users", user.uid, "passes", userSwiped.id),
      userSwiped //passed ALL INFO OF THE USER HERE
    );
  };
  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    //get that user's data
    const userSwiped = profiles[cardIndex];

    // console.log("USERSWIPED:", userSwiped);
    // console.log("USER:", user);

    // TODO IS THIS NECESSARY THOUGH>?>?>?>??>?
    //TODO once first AWAIT is loaded, then get data from second AWAIT
    const loggedInProfile = await getDoc(doc(db, "users", user.uid)).then(
      (userData) =>
        // console.log("userData.data:", userData.data());
        userData.data()
    );

    // await(
    //   await getDoc(doc(db, "users", user.uid))
    // ).data();
    // console.log("Logged In Profile:", loggedInProfile);
    // console.log("User:", user.providerData);
    // console.log("userSwiped:", userSwiped);

    //Check if user swiped on you...
    //TODO IMPORTANT 3:56:45
    //A MATCH MADE SHOULD BE ON SERVER (put this code on cloud), else
    //people can see other people's matches

    //BEWARE of UID vs ID here
    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          //user already swiped on you => MATCH!
          // console.log(`YOU MATCHED WITH ${userSwiped.displayName}`);

          //swipe recorded first
          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          //create the MATCH!
          //TODO user1.uid+user2.uid = matchID WHICH will always be unique !

          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            //info to be set, //TODO IMPORTANT PART

            users: {
              //object, not array
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped, //tell which user is which
            },

            usersMatched: [user.uid, userSwiped.id], //string comparison check
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            //TODO Navigation() can be used to pass values as PROPS
            loggedInProfile,
            userSwiped,
          });
        } else {
          //you swiped as the first of the two, or didnt get swiped
          //user has swiped
          // console.log(`You SWIPED for MATCH on ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <View style={tw("flex-1 my-8")}>
      {/* header */}
      {/* can add justify-between, flex-row, and then (px-5)padding/margin(mx-5) horizontal and try it too
      then remove the absolute right left specs for others */}
      <View style={tw("relative items-center")}>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={{
              uri: "https://i.imgur.com/u01O9pn.png",
            }}
            style={tw("h-14 w-20")}
          />
        </TouchableOpacity>
        
      </View>

      {/* end of header */}

      

      {/* CARDS */}
      <View style={tw("flex-1 bottom-16")}>
        <Swiper
          ref={swipeRef}
          containerStyle={tw("bg-transparent")}
          cards={profiles}
          // cards={DUMMY_DATA}
          stackSize={4}
          cardIndex={0} //starts at zero, helps a lot later
          verticalSwipe={false}
          verticalScrolling={false}
          //adding SWIPE FUNCTIONS

          //TODO pass the cardINDEX along with the swipe, so we know which card got what swiped
          onSwipedLeft={(cardIndex) => {
            // console.log("SWIPED NOPE!");
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            // console.log("SWiped MATCH!");
            swipeRight(cardIndex);
          }}
          //ending SWIPE FUNCTIONS
          backgroundColor={"#4FD0E9"}
          overlayLabels={{
            left: {
              title: "PASS",
              style: {
                label: {
                  textAlign: "right", //by default its to the left
                  color: "red",
                },
              },
            },
            right: {
              title: "SMASH",

              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          animateCardOpacity //swipe out animation comes in for stack size and cards behind it
          //TODO if cards available then do this
          renderCard={(card) =>
            card ? (
              
              <View
                key={card.id}
                style={tw("relative bg-white h-9/10 rounded-md")}
              >

                <Image
                  source={{ uri: card.photoURL }}
                  style={tw('flex-1 rounded-t-xl')}
                />
                {/* Profile Description below the image */}
                <View
                  style={[
                    tw(
                      "absolute bottom-negative flex-row bg-white justify-between items-center w-full h-16 px-6 py-2 rounded-b-xl"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tw("text-xl font-bold")}>
                      {card.displayName}
                    </Text>
                    <Text>{card.job}</Text>
                  </View>
                  <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>

            ) : (
              <View
                style={[
                  tw(
                    "relative bg-white h-3/4 rounded-xl justify-center items-center h-28"
                    //h-3/4 do it later
                  ),
                  styles.cardShadow,
                ]}
              >
                <Text style={tw("pb-5, text-md, font-semibold")}>Visit FreedomWall and wait for matches!</Text>
                {/**  <Image
                  style={tw("h-20 w-full")}
                  height={5}
                  width={5}
                  source={{
                    uri: "https://links.papareact.com/6gb",
                  }}
                /> */}
              </View>
            )
          }
        />
      </View>
      <BottomNavi/>
    </View>

  );
};


export default HomeScreen2;

//for shadows since not in tailwind RN
const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1.41,

    elevation: 2,
  },
});


