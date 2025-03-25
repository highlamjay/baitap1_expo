import { useNavigation } from "@react-navigation/native";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const data = [
    {id: "SE346.P21", room: "B4.16", subject: "Lập trình thiết bị di động", lesson: "Thứ 3, tiết 1-4", lecturer: "Nguyễn Tấn Toàn"},
    {id: "SE405.P21", room: "B4.10", subject: "Chuyên đề Mobile and Pervasive Computing", lesson: "Thứ 4, tiết 1-4", lecturer: "Nguyễn Tấn Toàn"},
    {id: "SE400.P21", room: "B5.12", subject: "Seminar các vấn đề hiện đại của CNPM", lesson: "Thứ 6, tiết 1-4", lecturer: "Lê Văn Tuấn"},
    {id: "SE401.P21", room: "B3.12", subject: "Design Pattern", lesson: "Thứ 6, tiết 6-8", lecturer: "Lê Thanh Trọng"},
]

const ClassRoom = () => {

    const navigation = useNavigation();

    const handleNavigateDetail = (item) => {
        navigation.navigate("DetailsRoom", {item})
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => handleNavigateDetail(item)}>
                        <Text style={styles.subject}>{item.subject}</Text>
                        <Text style={styles.info}>Phòng: {item.room}</Text>
                        <Text style={styles.info}>Lịch học: {item.lesson}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        paddingTop: 40,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3, 
    },
    subject: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    info: {
        fontSize: 14,
        color: '#666',
    },
});

export default ClassRoom;