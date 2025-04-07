import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../config/colors";

const CustomAlert = ({ visible, title, message, option1, option2, onOption1, onOption2, onCancel }) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.alertBox}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onOption1} style={[styles.button, styles.optionButton]}>
              <Text style={styles.buttonText}>{option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOption2} style={[styles.button, styles.optionButton]}>
              <Text style={styles.buttonText}>{option2}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: colors.medium,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  optionButton: {
    backgroundColor: colors.primary,
  },
  cancelButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CustomAlert;

