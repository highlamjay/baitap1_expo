import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const EmployeeDetail = () => {

    const [employee, setEmployee] = useState("");
    const route = useRoute();
    const { id } = route.params;

    const getDetailEmployee = async (id) => {
        try {
            const response = await fetch(`http://blackntt.net:88/api/v1/employee/${id}`);
            const data = await response.json();
            setEmployee(data);
            console.log(data)
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    useEffect(() => {
        getDetailEmployee(id);
    },[id])
    
    return (
        <View style={styles.container}>
             <Image 
                source={{ uri: employee.profile_image }} 
                style={styles.image}
            />
            <View style={styles.detailCard}>
                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Id:</Text>
                    <Text style={styles.value}>{employee.id}</Text>
                </View>

                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{employee.employee_name}</Text>
                </View>

                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Age:</Text>
                    <Text style={styles.value}>{employee.employee_age}</Text>
                </View>

                <View style={styles.viewwrapper}>
                    <Text style={styles.label}>Salary:</Text>
                    <Text style={styles.value}>{employee.employee_salary}</Text>
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
    image: {
        width: 150, 
        height: 150, 
        borderRadius: 75, 
        marginBottom: 20
    }
});

export default EmployeeDetail;
