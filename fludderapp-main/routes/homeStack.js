import React from "react"
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import UserGuideOne from "../screens/userGuideOne";
import UserGuideTwo from "../screens/userGuideTwo";
import UserGuideThree from "../screens/userGuideThree";
import UserGuideFour from "../screens/userGuideFour";
import UserGuideFive from "../screens/userGuideFive";
import SignUp from "../screens/signUp";
import EmailVerification from "../screens/emailVerification";
import Login from "../screens/login";
import Categories from "../screens/categories";
import Questions from "../screens/questions";
import RecordAnswerOne from "../screens/recordAnswerOne";
import RecordAnswerThreeOne from "../screens/recordAnswerThreeOne";
import RecordAnswerFour from "../screens/recordAnswerFour";
import RecordAnswerFive from "../screens/recordAnswerFive";
import AllMyAnswers from "../screens/allMyAnswers";
import Review from "../screens/review";
import PendingReview from "../screens/pendingReview";
import SelectAction from "../screens/selectAction";
import AddQuestion from "../screens/addQuestion";
import SubmitQuestion from "../screens/submitQuestion";
import SubmitQuestionSuccess from "../screens/submitQuestionSuccess";
import AllMyQuestions from "../screens/allMyQuestions";
import StudentAnswers from "../screens/studentAnswers";
import SubmitReview from "../screens/submitReview";
import SubmitReviewSuccess from "../screens/submitReviewSuccess";
import Footer from "../components/footer";
import ProfessionalProfile from "../screens/professionalProfile";
import UserProfile from "../screens/UserProfile";
import EditQuestion from "../screens/editQuestion";
import RatingOne from "../screens/ratingOne";
import RatingTwo from "../screens/ratingTwo";
import RatingThree from "../screens/ratingThree";
import RatingFour from "../screens/ratingFour";
import RatingFive from "../screens/ratingFive";
import RatingFiveOne from "../screens/ratingFiveOne";
import EditProfile from "../screens/editProfile";
import EditProfilePicture from "../screens/editProfilePicture";
import ForgotPasswordVerificationCode from "../screens/forgotPasswordVerificationCode";
import ForgotPasswordEmailVerification from "../screens/forgotPasswordEmailVerification";
import RecordAnswerCountDown from "../screens/recordAnswerCountDown";
// import LoginWithGoogle from "../screens/loginWithGoogle";
import CameraOptions from "../screens/cameraOptions";
import TestCat from "../screens/testCat";
import SignUpOptions from "../screens/SignUpOptions";
import EditAdvancedProfile from "../screens/editAdvancedProfile";
import UserAdvancedProfile from "../screens/userAdvancedProfile";
import Chat from "../screens/Chat";
import NewHomeScreen from "../screens/NewHomeScreen";
import InAppNotifications from "../screens/InAppNotifications";
import { Component } from "react";

const screens = {
  UserGuideOne: {
    screen: UserGuideOne,
  },
  UserGuideTwo: {
    screen: UserGuideTwo,
  },
  UserGuideThree: {
    screen: UserGuideThree,
  },
  UserGuideFour: {
    screen: UserGuideFour,
  },
  UserGuideFive: {
    screen: UserGuideFive,
  },
  SignUp: {
    screen: SignUp,
  },
  EmailVerification: {
    screen: EmailVerification,
  },
  Login: {
    screen: Login,
  },
  Categories: {
    screen: Categories,
  },
  Questions: {
    screen: Questions,
  },
  RecordAnswerOne: {
    screen: RecordAnswerOne,
  },
  RecordAnswerThreeOne: {
    screen: RecordAnswerThreeOne,
  },
  RecordAnswerFour: {
    screen: RecordAnswerFour,
  },
  RecordAnswerFive: {
    screen: RecordAnswerFive,
  },
  AllMyAnswers: {
    screen: AllMyAnswers,
  },
  Review: {
    screen: Review,
  },
  PendingReview: {
    screen: PendingReview,
  },
  SelectAction: {
    screen: SelectAction,
  },
  AddQuestion: {
    screen: AddQuestion,
  },
  SubmitQuestion: {
    screen: SubmitQuestion,
  },
  SubmitQuestionSuccess: {
    screen: SubmitQuestionSuccess,
  },
  AllMyQuestions: {
    screen: AllMyQuestions,
  },
  StudentAnswers: {
    screen: StudentAnswers,
  },
  SubmitReview: {
    screen: SubmitReview,
  },
  SubmitReviewSuccess: {
    screen: SubmitReviewSuccess,
  },
  Footer: {
    screen: Footer,
  },
  ProfessionalProfile: {
    screen: ProfessionalProfile,
  },
  UserProfile: {
    screen: UserProfile,
  },
  EditQuestion: {
    screen: EditQuestion,
  },
  RatingOne: {
    screen: RatingOne,
  },
  RatingTwo: {
    screen: RatingTwo,
  },
  RatingThree: {
    screen: RatingThree,
  },
  RatingFour: {
    screen: RatingFour,
  },
  RatingFive: {
    screen: RatingFive,
  },
  EditProfile: {
    screen: EditProfile,
  },
  EditProfilePicture: {
    screen: EditProfilePicture,
  },
  ForgotPasswordVerificationCode: {
    screen: ForgotPasswordVerificationCode,
  },
  ForgotPasswordEmailVerification: {
    screen: ForgotPasswordEmailVerification,
  },
  RecordAnswerCountDown: {
    screen: RecordAnswerCountDown,
  },
  // LoginWithGoogle: {
  //   screen: LoginWithGoogle,
  // },
  CameraOptions: {
    screen: CameraOptions,
  },
  TestCat: {
    screen: TestCat
  },
  RatingFiveOne: {
    screen: RatingFiveOne
  },
  SignUpOptions: {
    screen: SignUpOptions
  },
  EditAdvancedProfile: {
    screen: EditAdvancedProfile
  },
  UserAdvancedProfile: {
    screen: UserAdvancedProfile
  },
  Chat: {
    screen: Chat
  },
  NewHomeScreen: {
    screen: NewHomeScreen
  },
  InAppNotifications: {
    screen: InAppNotifications
  }
};

class homeStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRoute: "",
      loading: true,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    let val = await AsyncStorage.getItem("loginState");
    let signUpVal = await AsyncStorage.getItem("signUpState");
    let userType = await AsyncStorage.getItem('userType');
    if (val == "true") {
      if (userType === 'P') {
        this.setState({ initialRoute: "Categories" }, () =>
          this.setState({ loading: false })
        );
      }
      else {
        this.setState({ initialRoute: "NewHomeScreen" }, () =>
          this.setState({ loading: false })
        );
      }
    }
    else if (signUpVal == "true") {
      this.setState({ initialRoute: "Login" }, () =>
        this.setState({ loading: false })
      );
    }
    else if (val != "true") {
      this.setState({ initialRoute: "UserGuideOne" }, () =>
        this.setState({ loading: false })
      );
    }
  }

  render() {
    const HomeStack = createStackNavigator(screens, {
      initialRouteName: this.state.initialRoute, headerMode: 'none'
    });

    const Apps2 = createAppContainer(HomeStack);
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator color="red" size="large"></ActivityIndicator>
        </View>
      );
    } else if (!this.state.loading) {
      return <Apps2></Apps2>;
    }
  }
}

export default homeStack;