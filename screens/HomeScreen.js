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
  FlatList,
  ActivityIndicator,
} from "react-native";
// import useAuth from "../hooks/useAuth";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from 'react-native-responsive-dimensions'
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
import { db, firestore } from "../firebase";
import generateId from "../lib/generateId";
import { FacebookAuthProvider } from "firebase/auth";
import { connect } from 'react-redux'
import moment from "moment";
import CheckBoxButton from '../components/CheckBoxButton'

const HomeScreen = ({ user }) => {
  const [cardShowing, setCardShowing] = useState({})
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();
  // const { user, logout } = useAuth();
  // console.log(user);
  const swipeRef = useRef();

  //for mapping on the cards, replacing the DUMMY_DATA with the data from the database
  const [profiles, setProfiles] = useState([]);
  //when components paints on screen, refactor/use useffect can also be used
  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user?.uid), (snapshot) => {
        // if personal details not filled, prompt the MODAL SCREEN
        // TODO    user?.uid = for the user who has logged in
        const unsub = onSnapshot(doc(db, "users", user?.uid), (snapshot) => {
          // console.log(
          //   "````````````````Snapshot:`````````````````````````",
          //   snapshot
          // );

          if (!snapshot.exists()) {
            navigation.navigate("Modal");
          }
        })
      }),
    []
  );

  useEffect(async () => {
    setLoading(true)
    // console.log(user)
    let unsub;

    const fetchCards = async () => {
      //fetch previously NOPED cards
      //this is not realtime, since rfor that we use onSnapshot and not getDocs

      //TODO await THESE MFs
      const passes = await getDocs(
        collection(db, "users", user?.uid, "passes")
      ).then(
        //this is IMPLICIT RETURN THAT'S WHY NO BRACKETS USED BELOW
        (snapshot) => snapshot.docs.map((doc) => doc.id) //all IDs of the passes/nopes are mapped into passes array
      );
      // const passes = await getDocs(
      //   collection(db, "users")
      // ).then(
      //   //this is IMPLICIT RETURN THAT'S WHY NO BRACKETS USED BELOW
      //   (snapshot) => snapshot.docs.map((doc) => doc.id) //all IDs of the passes/nopes are mapped into passes array
      // );
      const swipes = await getDocs(
        collection(db, "users", user?.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      // const swipes = await getDocs(
      //   collection(db, "users")
      // ).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      // console.log(passes, 'passes')
      // console.log(swipes, 'swipes')
      //   //TODO when QUERYING on DB, cant pass EMPTY ARRAY, value is required!
      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];
      // console.log(passedUserIds, 'passes')
      // console.log(swipedUserIds, 'swipes')
      // console.log("NOPED followed by Right SWIPED", [
      //   passedUserIds,
      //   swipedUserIds,
      // ]);

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("uid", "not-in", [...passedUserIds, ...swipedUserIds]),
        ), //[...] because we adding swiped/YES IDS as well, so remove swiped people ALL IN ALL
        (snapshot) => {
          // console.log(snapshot.docs.values, 'snap boy')
          setProfiles(
            //map through the array and build object

            //before the map, filter the USER that is logged in here
            snapshot.docs
              .filter((doc) => doc.id !== user?.uid && doc.gender != user?.gender)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };
    fetchCards();
    setLoading(false)
    // console.log(profiles, 'profiles')
    return unsub;
  }, []);

  // console.log("Profiles:", profiles);

  const swipeLeft = (cardIndex) => {
    //adds record in THEIR
    if (!profiles[cardIndex]) return;
    //if swiped on card, if card isnt in profiles[], dont interact with DB

    const userSwiped = profiles[cardIndex];
    // console.log(`You swiped NOOPE on ${userSwiped.displayName}`);

    //TODO go into the database->users->userID->passes/NOPES collection of this particular user->userSwiped ki ID
    setDoc(
      doc(db, "users", user?.uid, "passes", userSwiped.id),
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
    const loggedInProfile = await getDoc(doc(db, "users", user?.uid)).then(
      (userData) =>
        // console.log("userData.data:", userData.data());
        userData.data()
    );

    // await(
    //   await getDoc(doc(db, "users", user?.uid))
    // ).data();
    // console.log("Logged In Profile:", loggedInProfile);
    // console.log("User:", user.providerData);
    // console.log("userSwiped:", userSwiped);

    //Check if user swiped on you...
    //TODO IMPORTANT 3:56:45
    //A MATCH MADE SHOULD BE ON SERVER (put this code on cloud), else
    //people can see other people's matches

    //BEWARE of UID vs ID here
    getDoc(doc(db, "users", userSwiped.id, "swipes", user?.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          //user already swiped on you => MATCH!
          // console.log(`YOU MATCHED WITH ${userSwiped.displayName}`);

          //swipe recorded first
          setDoc(
            doc(db, "users", user?.uid, "swipes", userSwiped.id),
            userSwiped
          );

          //create the MATCH!
          //TODO user1?.uid+user2?.uid = matchID WHICH will always be unique !

          setDoc(doc(db, "matches", generateId(user?.uid, userSwiped.id)), {
            //info to be set, //TODO IMPORTANT PART

            users: {
              //object, not array
              [user?.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped, //tell which user is which
            },

            usersMatched: [user?.uid, userSwiped.id], //string comparison check
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
            doc(db, "users", user?.uid, "swipes", userSwiped.id),
            userSwiped
          );
        }
      }
    );
  };

  return (
    <View style={tw("flex-1 bg-background")}>
      {/* header */}
      {/* can add justify-between, flex-row, and then (px-5)padding/margin(mx-5) horizontal and try it too
      then remove the absolute right left specs for others */}
      <View style={tw("relative items-center ")}>

        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={{
              uri: "https://i.imgur.com/DZlkGPe.png",
            }}
            style={tw("h-8 w-20 top-1")}
          />
        </TouchableOpacity>

      </View>
      {
        loading && (
          <ActivityIndicator size="large" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, zIndex: 1000 }} color="#FFCB37" />
        )
      }
      {/* end of header */}



      {/* CARDS */}
      <View style={{ height: responsiveHeight(100) }}>
        {
          profiles.length > 0 && (
            <View style={{ height: responsiveHeight(100), width: responsiveWidth(100) }} >
              <Swiper
                ref={swipeRef}
                containerStyle={[{ height: responsiveHeight(100), backgroundColor: '#1F2630' }]}
                cards={profiles}
                // cards={DUMMY_DATA}
                stackSize={1}
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
                renderCard={(card) => {
                  // setCardShowing(card)
                  // console.log(card)
                  return (
                    card ? (
                        <View
                          key={card?.uid}
                          style={tw("bottom-12")}
                        >
                          <ScrollView>
                          <TouchableOpacity>

                          <Image
                            source={{ uri: card?.image[0] }}
                            style={{ height: responsiveHeight(73), width: responsiveWidth(90), alignSelf: 'center', borderTopRightRadius: 10, borderTopLeftRadius: 10, }}
                          />
                          {/* Profile Description below the image */}
                          <View
                            style={[
                              // tw(
                              //   "absolute bottom-negative flex-row bg-white justify-between items-center w-full h-16 px-6 py-2 rounded-b-xl"
                              // ),
                              // styles.cardShadow,
                            ]}
                          >
                            <View style={{ backgroundColor: '#444D5C', alignSelf: 'center', width: responsiveWidth(90), borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingHorizontal: 20 }} >
                              <View style={{ flexDirection: 'row' }} >
                                <Text style={tw("text-2xl font-bold text-white top-2")}>
                                  {card.name[0]}
                                </Text>
                                <Text style={tw("text-2xl font-bold text-white top-2")}>
                                , 
                                </Text>
                                <Text style={tw("text-transparent")}>--
                                </Text>
                                <Text style={tw("text-2xl font-bold text-white top-2")}>
                                  {/* {card?.dob?.seconds / 31536000} */}
                                  {card?.dob ? moment().diff(new Date(card?.dob?.seconds * 1000), 'years') : 'N/A'}
                                </Text>
                              </View>
                              <Text style={tw("text-white text-md top-2")}>{card?.SchoolorWorkText}</Text>
                              <Text></Text>
                              <Text></Text>
                              <View style={tw("rounded-2xl bg-gray")}>
                              <Text></Text>
                              <View style={tw("left-6 right-1 rounded-md")}>
                              <Text style={tw("text-white text-xl font-bold")}>My Basics</Text>
                              <Text style={tw("text-lg font-bold")}>
                                {card?.basics[0]}, {card?.basics[1]}, {card?.basics[2]} 
                              </Text>
                              <Text style={tw("text-lg font-bold")}>
                                {card?.basics[4]}, {card?.basics[5]}, {card?.basics[6]} 
                              </Text>
                              <Text style={tw("text-lg font-bold")}>
                                {card?.basics[7]}, {card?.basics[8]}, {card?.basics[9]} 
                              </Text>
                              <Text style={tw("text-lg font-bold")}>
                                {card?.basics[10]}, {card?.basics[11]}, {card?.basics[12]} 
                              </Text>
                              <Text style={tw("text-lg font-bold")}>
                                {card?.basics[13]}, {card?.basics[14]}, {card?.basics[15]} 
                              </Text>
                              </View>
                              <Text></Text>
                              </View>
                              <Text></Text>
                              <Image
                            source={{ uri: card?.image[1] }}
                            style={{ height: responsiveHeight(40), width: responsiveWidth(80), alignSelf: 'center', borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomRightRadius: 10, borderBottomLeftRadius: 10 }}
                          />
                              <Text></Text>
                              <Text></Text>
                              <View style={tw("rounded-2xl bg-gray")}>
                              <Text></Text>
                              <View style={tw("left-6 right-4 rounded-md")}>
                              <Text style={tw("text-white text-xl font-bold")}>We'll get on if...</Text>
                              <Text style={tw("text-lg font-bold text-gray-800")}>{card?.getOnIfAnswer}, </Text>
                              </View>

                              <Text></Text>
                              </View>
                              <Text></Text>
                              <View style={tw("rounded-2xl bg-gray")}>
                              <Text></Text>
                              <View style={tw("left-6 right-4 rounded-md")}>
                              <Text style={tw("text-white text-xl font-bold")}>I would rather...</Text>
                              <Text style={tw("text-lg font-bold text-gray-800")}>{card?.wouldRatherAnswer}</Text>
                              </View>
                              <Text></Text>
                              
                              </View>
                              <Text></Text>
                              <View style={tw("rounded-2xl bg-gray")}>
                              <Text></Text>
                              <View style={tw("left-6 right-4 rounded-md")}>
                              <Text style={tw("text-white text-xl font-bold")}>Location</Text>
                              <Text style={tw("text-lg font-semibold text-gray-800")}>{card?.location}</Text>
                              </View>
                              <Text></Text>

                              </View>
                              <Text></Text>
                            </View>
                            {/* <View style={styles.detailsContainer} >
                              <Text style={styles.headerText}>
                                I would rather...
                              </Text>
                              <Text style={styles.answerText}>
                                {card?.wouldRatherAnswer}
                              </Text>
                            </View> */}
                          </View>
                      </TouchableOpacity>
                      </ScrollView>
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
                        <Image
                          style={tw("h-20 w-full")}
                          height={5}
                          width={5}
                          source={{
                            uri: "https://links.papareact.com/6gb",
                          }}
                        />
                      </View>
                    )
                  )
                }

                }
              />
            </View>
            
          )
        }
        {/* <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, }}>
          <View style={styles.imageContainer} >
            <Image style={styles.image}
              source={{ uri: user?.image[0] }}
            />
          </View>
          <View style={styles.nameSchoolContainer} >
            <Text style={styles.nameAgeText} >
              {user?.name}, {moment().diff(user?.dob, 'years')}
            </Text>
            <Text style={styles.schoolText} >
              School
            </Text>
          </View>
          <View style={styles.detailsContainer} >
            <Text style={styles.headerText}>
              Basics
            </Text>
            <FlatList
              data={user?.basics}
              numColumns={3}
              // ItemSeparatorComponent
              renderItem={({ item }) => {
                return (
                  <View style={{ margin: 5 }}>
                    <CheckBoxButton
                      size="small"
                      header={item}
                      selected={true}
                    />
                  </View>
                )
              }}
            />

          </View>
          <View style={styles.detailsContainer} >
            <Text style={styles.headerText}>
              I would rather...
            </Text>
            <Text style={styles.answerText}>
              {user?.wouldRatherAnswer}
            </Text>
          </View>
          {
            user?.image?.length > 1 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={user?.image}
                ItemSeparatorComponent={() => <View style={{ marginTop: 5 }} />}
                renderItem={({ item, index }) => {
                  if (index !== 0)
                    return (
                      <Image style={[styles.image, { borderRadius: 10, alignSelf: 'center' }]}
                        source={{ uri: item }}
                      />
                    )
                }}
              />
            )
          }
          <View></View>
          <View style={styles.detailsContainer} >
            <Text style={styles.headerText}>
              you can find me...
            </Text>
            <Text style={styles.answerText}>
              {user?.findMeAnswer}
            </Text>
          </View>
          <View style={styles.detailsContainer} >
            <Text style={styles.headerText}>
              Location
            </Text>
            <Text style={styles.answerText}>
              {user?.location}
            </Text>
          </View>

        </ScrollView> */}


      </View>
      <BottomNavi />

    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
}

export default connect(mapStateToProps)(HomeScreen);

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
  imageContainer: {
    height: responsiveHeight(65),
    width: responsiveWidth(90),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20
  },
  image: {
    height: responsiveHeight(70),
    width: responsiveWidth(90),
    // borderRadius: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // resizeMode: 'contain',
  },
  nameSchoolContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#444D5C',
    padding: 15,
    width: responsiveWidth(90),
    alignSelf: 'center',
    marginBottom: 10,
  },
  nameAgeText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',

  },
  schoolText: {
    color: 'white',
    fontSize: responsiveFontSize(1.95),
    fontWeight: '900',
  },
  detailsContainer: {
    width: responsiveWidth(80),
    padding: 15,
    alignSelf: 'center',
    backgroundColor: '#444D5C',
    marginVertical: 10,
    borderRadius: 15
  },
  headerText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold'
  },
  answerText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',

  }
});


