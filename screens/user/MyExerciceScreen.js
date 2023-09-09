import {
    StyleSheet,
    StatusBar,
    View,
    TouchableOpacity,
    Text,
    Image,
    FlatList,
    RefreshControl,
    ScrollView,
  } from "react-native";
  import { Ionicons } from "@expo/vector-icons";
  import React, { useEffect, useState } from "react";
  import cartIcon from "../../assets/icons/cart_beg.png";
  import scanIcon from "../../assets/icons/scan_icons.png";
  import easybuylogo from "../../assets/logo/logo-pet.png";
  import { colors } from "../../constants";
  import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
  
  import UserProfileCard from "../../components/BarTopHome/UserProfileCard";
  import ProductCard from "../../components/ProductCard/ProductCard";
  import { network } from "../../constants";
  import { useSelector, useDispatch } from "react-redux";
  import { bindActionCreators } from "redux";
  import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
  import SearchableDropdown from "react-native-searchable-dropdown";
  import { SliderBox } from "react-native-image-slider-box";
  import CenterIcon from "../../assets/icons/bar_center_icon.png";
  
  const category = [
    {
      _id: "62fe244f58f7aa8230817f89",
      title: "Nutricionista",
      image: require("../../assets/icons/Carlos.jpg"),
    },
    {
      _id: "62fe243858f7aa8230817f86",
      title: "PersonalX",
      image: require("../../assets/icons/Carlos.jpg"),
    },
    {
      _id: "62fe241958f7aa8230817f83",
      title: "PersonalX",
      image: require("../../assets/icons/Carlos.jpg"),
    },
    {
      _id: "62fe246858f7aa8230817f8c",
      title: "PersonalX",
      image: require("../../assets/icons/Carlos.jpg"),
    },
  ];
  
  const slides = [
    require("../../assets/image/banners/banner.png"),
    require("../../assets/image/banners/banner-adopet.png"),
  ];
  
  const HomeScreen = ({ navigation, route }) => {
    const cartproduct = useSelector((state) => state.product);
    const dispatch = useDispatch();
  
    const { addCartItem } = bindActionCreators(actionCreaters, dispatch);
  
    const { user } = route.params;
    const [products, setProducts] = useState([]);
    const [refeshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");
    const [userInfo, setUserInfo] = useState({});
    const [searchItems, setSearchItems] = useState([]);
  
    //method to convert the authUser to json object
    const convertToJSON = (obj) => {
      try {
        setUserInfo(JSON.parse(obj));
      } catch (e) {
        setUserInfo(obj);
      }
    };
  
    //method to navigate to product detail screen of a specific product
    const handleProductPress = (product) => {
      navigation.navigate("productdetail", { product: product });
    };
  
    //method to add to cart (redux)
    const handleAddToCat = (product) => {
      addCartItem(product);
    };
  
    var headerOptions = {
      method: "GET",
      redirect: "follow",
    };
  
    const fetchProduct = () => {
      fetch(`${network.serverip}/products`, headerOptions) //API call
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setProducts(result.data);
            setError("");
            let payload = [];
            result.data.forEach((cat, index) => {
              let searchableItem = { ...cat, id: ++index, name: cat.title };
              payload.push(searchableItem);
            });
            setSearchItems(payload);
          } else {
            setError(result.message);
          }
        })
        .catch((error) => {
          setError(error.message);
          console.log("error", error);
        });
    };
  
    //method call on pull refresh
    const handleOnRefresh = () => {
      setRefreshing(true);
      fetchProduct();
      setRefreshing(false);
    };
  
    //convert user to json and fetch products in initial render
    useEffect(() => {
      convertToJSON(user);
      fetchProduct();
    }, []);
  
    return (
      <View style={styles.container}>
        <StatusBar></StatusBar>
        <View style={styles.topBarContainer}>
          <TouchableOpacity>
            <UserProfileCard
              Icon={Ionicons}
              name={user["name"]}
              email={user["email"]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartIconContainer}
            onPress={() => navigation.navigate("cart")}
          >
            {cartproduct.length > 0 ? (
              <View style={styles.cartItemCountContainer}>
                <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
              </View>
            ) : (
              <></>
            )}
            <Ionicons name="cart-outline" size={30} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.bodyContainer}>
          <ScrollView nestedScrollEnabled={true}>
            <View style={styles.promotiomSliderContainer}>
              <SliderBox
                images={slides}
                sliderBoxHeight={140}
                dotColor={colors.primary}
                inactiveDotColor={colors.muted}
                paginationBoxVerticalPadding={10}
                autoplayInterval={6000}
              />
            </View>
            <View style={styles.containerAtividades}>
              <Text style={styles.primaryText}>Atividades</Text>
              <Text style={styles.textMore}>Ver Todas</Text>
            </View>
            <View style={styles.containerAtividades}>
              <View style={styles.listAtividades}>
                <Text style={styles.textProduct}>LegPress</Text>
                <Text style={styles.textProduct}>LegPress</Text>
                <Text style={styles.textProduct}>LegPress</Text>
                <Text style={styles.textProduct}>LegPress</Text>
              </View>
              <View style={styles.listCoins}>
                  <View style={styles.coinsProducts}>
                    <Image source={CenterIcon} style={StyleSheet.tabIconStyle} />
                    <Text style={styles.textCoins}>350</Text>
                  </View>        
                  <View style={styles.coinsProducts}>
                    <Image source={CenterIcon} style={StyleSheet.tabIconStyle} />
                    <Text style={styles.textCoins}>350</Text>
                  </View>        
                  <View style={styles.coinsProducts}>
                    <Image source={CenterIcon} style={StyleSheet.tabIconStyle} />
                    <Text style={styles.textCoins}>350</Text>
                  </View>        
                  <View style={styles.coinsProducts}>
                    <Image source={CenterIcon} style={StyleSheet.tabIconStyle} />
                    <Text style={styles.textCoins}>350</Text>
                  </View>             
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      flexDirecion: "row",
      backgroundColor: colors.dark,
      alignItems: "center",
      justifyContent: "flex-start",
      paddingBottom: 0,
      flex: 1,
    },
    topBarContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 20,
    },
    toBarText: {
      fontSize: 15,
      fontWeight: "600",
    },
    tabIconStyle: {
      width: 10,
      height: 10,
    },
    containerAtividades:{
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      flexDirection: "row",
      marginTop: 25,
      paddingHorizontal: 30,
    },
    listAtividades: {
      
    },
    listCoins: {
  
    },
    coinsProducts:{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
  
    },
    topbarlogoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 20,
    },
    bodyContainer: {
      width: "100%",
      flexDirecion: "row",
  
      paddingBottom: 0,
      flex: 1,
    },
    logoContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    logo: {
      height: 30,
      width: 30,
      resizeMode: "contain",
    },
    secondaryText: {
      fontSize: 25,
      fontWeight: "bold",
    },
    searchContainer: {
      marginTop: 10,
      padding: 10,
      width: "100%",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    inputContainer: {
      width: "70%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
      width: "20%",
      justifyContent: "center",
      alignItems: "center",
    },
    scanButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.light,
      borderRadius: 10,
      height: 40,
      width: "100%",
    },
    scanButtonText: {
      fontSize: 15,
      color: colors.light,
      fontWeight: "bold",
    },
    primaryTextContainer: {
      padding: 20,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: "100%",
      paddingTop: 10,
      color: colors.light,
      paddingBottom: 10,
    },
    textProduct:{
      fontSize: 20,
      color: colors.light,
      marginBottom: 30,
      top: 20,
    },
    textCoins: {
      fontSize: 20,
      color: colors.light,
      marginTop: 15,
      bottom: 7,
    },
    textMore:{
      fontSize: 20,
      color: colors.light,
      textDecorationLine: "underline"
    },
    primaryText: {
      fontSize: 20,
      color: colors.light,
      fontWeight: "bold",
    },
    flatListContainer: {
      width: "100%",
      marginTop: 10,
      marginLeft: 10,
    },
    promotiomSliderContainer: {
      margin: 5,
      height: 140,
      backgroundColor: colors.light,
    },
    categoryContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      marginLeft: 10,
    },
    emptyView: { width: 30 },
    productCardContainer: {
      paddingLeft: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      width: "100%",
      height: 240,
      marginLeft: 10,
      paddingTop: 0,
    },
    productCardContainerEmpty: {
      padding: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: 240,
      marginLeft: 10,
      paddingTop: 0,
    },
    productCardContainerEmptyText: {
      fontSize: 15,
      fontStyle: "italic",
      color: colors.muted,
      fontWeight: "600",
    },
    cartIconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 35,
    },
    cartItemCountContainer: {
      position: "absolute",
      zIndex: 10,
      top: -10,
      left: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 22,
      width: 22,
      backgroundColor: colors.danger,
      borderRadius: 11,
    },
    productCardDesign: {
      height: 62,
      width: 22,
      borderRadius: 21,
    },
    cartItemCountText: {
      color: colors.white,
      fontWeight: "bold",
      fontSize: 10,
    },
  });
  