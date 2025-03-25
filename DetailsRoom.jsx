import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const DetailsRoom = () => {
    const route = useRoute();
    const { item } = route.params;
    
    return (
        <View style={styles.container}>
            <View style={styles.detailCard}>
                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Mã học phần:</Text>
                    <Text style={styles.value}>{item.id}</Text>
                </View>

                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Môn học:</Text>
                    <Text style={styles.value}>{item.subject}</Text>
                </View>

                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Phòng:</Text>
                    <Text style={styles.value}>{item.room}</Text>
                </View>

                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Lịch học:</Text>
                    <Text style={styles.value}>{item.lesson}</Text>
                </View>

                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Giảng viên:</Text>
                    <Text style={styles.value}>{item.lecturer}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewwrapper: {
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        marginTop: 10,
    },
    detailCard: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
    },
    label: {
        fontWeight: '600',
        color: '#4CAF50',
        paddingRight: 10,
    },
    value: {
        fontSize: 16,
        color: '#2C3E50',
    },
});

export default DetailsRoom;
