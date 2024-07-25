import React from "react";

import {
  Button,
  CustomInput,
  ModalSelector,
  PasswordInput,
  PhoneNumberInput,
  Text,
} from "@/components";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignupSchema } from "@/utils/yup_validation/auth";
import { Colors, appDimension } from "@/constants";

const LoginScreen = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnMount: false,
    enableReinitialize: true,
    validateOnBlur: false,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  const signIn = () => {
    formik.submitForm();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text
          variant={"title"}
          text={"Hey, welcome!"}
          fontWeight="800"
          style={{ fontSize: 32 }}
          marginBottom={10}
        />
        <Text
          text={"Welcome to name! Enter all the details below to request been a using the app"}
          fontWeight="light"
          spaceRight={2}
          width={appDimension.width * 0.8}
          center
        />

        <View style={styles.form}>
          <CustomInput
            placeholder={"Email"}
            inputPlaceholder="Enter your email address"
            onPress={(value) => {
              formik.setValues((prev) => ({
                ...prev,
                email: value,
              }));
              formik.setErrors({});
            }}
            error={formik.errors.email}
          />
          <PhoneNumberInput
            placeholder={"Phone"}
            onPress={(value) => {
              formik.setValues((prev) => ({
                ...prev,
                phoneNumber: value,
              }));
              formik.setErrors({});
            }}
            error={formik.errors.phoneNumber}
          />
          <ModalSelector
            data={[{id: "male", key: "male", label: "Male"}, {id: "female",key: "female", label: "Female"}]}
            placeholder={"Gender"}
            onPress={(value) => {
              formik.setValues((prev) => ({
                ...prev,
                gender: value?.label,
              }));
              formik.setErrors({});
            }}
            error={formik.errors.gender}
          />
          <PasswordInput
            placeholder="Password"
            inputPlaceholder="enter password"
            onChange={(value) => {
              formik.setValues((prev) => ({
                ...prev,
                password: value,
              }));
              formik.setErrors({});
            }}
            error={formik.errors.password}
          />
          <PasswordInput
            placeholder="Confirm Password"
            inputPlaceholder="Confirm password"
            onChange={(value) => {
              formik.setValues((prev) => ({
                ...prev,
                confirmPassword: value,
              }));
              formik.setErrors({});
            }}
            error={formik.errors.confirmPassword}
          />
        </View>
      </View>
      <View style={styles.bottom}>
        <Text>
          <Text text={"I have and account"} fontWeight="light" spaceRight={2} />
          <Text
            text={"login"}
            fontWeight="semiBold"
            underlined
            color="primary"
            onPress={() => {
              router.replace("/auth/login");
            }}
          />
        </Text>
        <Button
          title="Sing up"
          containerStyle={{ width: appDimension.width * 0.8 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: appDimension.height,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.bg,
    paddingVertical: appDimension.height * 0.05,
    gap: 10,
  },

  form: {
    marginTop: 40,
    gap: 15,
    width: appDimension.width * 0.9,
    marginHorizontal: "auto",
  },

  bottom: {
    gap: 10,
    alignItems: "center",
  },
});
