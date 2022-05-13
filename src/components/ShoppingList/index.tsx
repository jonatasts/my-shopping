import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

import { shoppingListExample } from "../../utils/shopping.list.data";
import theme from "../../theme";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      .onSnapshot((snapshot) => {
        setRefreshing(true);
        const data = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);

        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      });

    return () => subscribe();
  }, []);

  return refreshing ? (
    <ActivityIndicator
      size={"large"}
      color={theme.COLORS.PURPLE}
      style={styles.activityIndicator}
    />
  ) : (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
