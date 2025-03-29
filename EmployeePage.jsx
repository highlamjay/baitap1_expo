import { useNavigation } from "@react-navigation/native";
import { Button, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import { AntDesign, Entypo } from '@expo/vector-icons';

const EmployeePage = () => {
    const [employees, setEmployee] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [employeeData, setEmployeeData] = useState({ id: null, name: '', age: 0 , salary: 0, image: ''});

   const openModal = (employee = null) => {
    if (employee) {
        setEmployeeData({ 
            id: employee.id, 
            name: employee.employee_name, 
            age: employee.employee_age, 
            salary: employee.employee_salary, 
            image: employee.profile_image,
        });
    } else {
        setEmployeeData({ 
            id: null, 
            name: '', 
            age: '', 
            salary: '', 
            image: "https://reactnative.dev/img/header_logo.svg"
        });
    }
    setModalVisible(true);
};

    const handleDelete = async (id) => {
        console.log(`Delete employee with ID: ${id}`);
        try {
            const response = await fetch(`http://blackntt.net:88/api/v1/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setRefresh(!refresh);
            } else {
                console.error("Failed to delete employee");
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }


     const handleSave = async () => {
        const url = employeeData.id 
            ? `http://blackntt.net:88/api/v1/update/${employeeData.id}` 
            : 'http://blackntt.net:88/api/v1/create';

        const method = employeeData.id ? 'PUT' : 'POST';

        console.log(employeeData);

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    employee_name: employeeData.name,
                    employee_age: employeeData.age,
                    employee_salary: employeeData.salary,
                    employee_image: employeeData.image
                }),
            });

            if (response.ok) {
                console.log(employeeData.id ? 'Employee updated successfully' : 'Employee added successfully');
                setModalVisible(false);
                setRefresh(!refresh);
            } else {
                console.error("Failed to save employee");
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    };

    const getAllEmployee = async () => {
        try {
            const response = await fetch('http://blackntt.net:88/api/v1/employees');
            const data = await response.json();
            setEmployee(data);
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
        }
    }

    useEffect(() => {
        getAllEmployee();
    }, [refresh])

    const navigation = useNavigation();

    const handleNavigateDetail = (id) => {
        navigation.navigate("EmployeeDetail", { id })
    }

    return (
         <ScrollView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.addButton} onPress={() => openModal()}>
                    <AntDesign name="pluscircle" size={24} color="white" />
                    <Text style={styles.addButtonText}>Add Employee</Text>
                </TouchableOpacity>

                <View style={styles.tableHeader}>
                    <Text style={styles.headerCell}>ID</Text>
                    <Text style={styles.headerCell}>Name</Text>
                    <Text style={styles.headerCell}>Age</Text>
                    <Text style={styles.headerCell}>Action</Text>
                </View>
                {employees.map((item) => (
                    <TouchableOpacity key={item.id} style={styles.tableRow} onPress={() => handleNavigateDetail(item.id)}>
                        <Text style={styles.cell}>{item.id}</Text>
                        <Text style={styles.cell}>{item.employee_name}</Text>
                        <Text style={styles.cell}>{item.employee_age}</Text>
                        <View style={styles.actionCell}>
                            <TouchableOpacity onPress={() => openModal(item)}>
                                <Entypo name="edit" size={20} color="blue" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                <AntDesign name="delete" size={20} color="red" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>
                                {employeeData.id ? "Edit Employee" : "Add Employee"}
                            </Text>
                            <TextInput
                                placeholder="Name"
                                style={styles.input}
                                value={employeeData.name}
                                onChangeText={(text) => setEmployeeData({ ...employeeData, name: text })}
                            />
                            <TextInput
                                placeholder="Age"
                                style={styles.input}
                                value={employeeData.age.toString()}
                                keyboardType="numeric"
                                onChangeText={(text) => setEmployeeData({ ...employeeData, age: text })}
                            />
                             <TextInput
                                placeholder="Salary"
                                style={styles.input}
                                value={employeeData.salary.toString()}
                                keyboardType="numeric"
                                onChangeText={(text) => setEmployeeData({ ...employeeData, salary: text })}
                            />
                            <TextInput
                                placeholder="Image"
                                style={styles.input}
                                value={employeeData.image}
                                onChangeText={(text) => setEmployeeData({ ...employeeData, image: text })}
                            />
                            <View style={styles.buttonContainer}>
                                <Button title="Save" onPress={handleSave} />
                                <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#f3f4f6',
        padding: 20,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 5,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    headerCell: {
        flex: 1,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 8,
    },
    tableRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    cell: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 10,
        color: '#333',
    },
    actionCell: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
export default EmployeePage;