import React,{useState,useEffect} from 'react';
import { TouchableOpacity,FlatList, Image,StyleSheet, StatusBar, Text, TextInput, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F5F0',
        paddingHorizontal: 16
    },

    headerText: {
        textAlign : 'center',
        marginTop: 20,
        fontSize: 28,
        fontWeight: '600'
    },

    searchBox: {
        marginTop:15,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: 'white',

    },

    searchInput: {
        height: 60
    },

    listItem: {
        marginTop: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    listText: {
        fontSize: 25,
        fontWeight: '300',
        fontStyle: 'italic',
    },
    avatar: {
        width: 58,
        height: 64,
        borderRadius: 34,
        marginRight: 12,
        backgroundColor: '#DDD'
    },

    textBlock: {
        flex: 1
    },

    phoneText: {
        marginTop: 4,
        fontSize: 17,
        color: 'black'
    },

});


let OriginalData = [];
const App = () => {
    const [myData, setMyData] = useState([]);

//Exercise 1B Add useEffect
    useEffect(() => {
        //Exercise 1A Add Fetch()
        const myurl = "https://onlinecontactbook-zo00.onrender.com/allcontacts"
        fetch(myurl)
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                setMyData(myJson);
                OriginalData=myJson;
            });
    }, [])

    //Exercise 1C Add FilterData
    const FilterData = (text) => {
        if(text != '') {

            let myFilteredData = OriginalData.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
            setMyData(myFilteredData);
        }else{
            setMyData(OriginalData);
        }
    }

    const renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <Image source={{uri: item.image}} style={styles.avatar} />
            <View>
                <Text style={styles.listText}>{item.name}</Text>
                <Text style={styles.phoneText}>{item.number}</Text>
            </View>

        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Text style={styles.headerText}>Contacts</Text>


            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Search contacts"
                    onChangeText={FilterData}
                    style={styles.searchInput}
                />
            </View>

            <FlatList
                data={myData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
};

export default App;
