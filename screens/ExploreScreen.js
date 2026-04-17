// screens/ExploreScreen.js
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    TextInput, Image, SafeAreaView, StatusBar,
} from 'react-native';

const GREEN = '#5DAF6A';

const categories = [
    { id: '1', name: 'Fresh Fruits\n& Vegetable', color: '#E8F5E9', image: require('../assets/rau.png') },
    { id: '2', name: 'Cooking Oil\n& Ghee', color: '#FFF8E1', image: require('../assets/oil.png') },
    { id: '3', name: 'Meat & Fish', color: '#FCE4EC', image: require('../assets/thit.png') },
    { id: '4', name: 'Bakery &\nSnacks', color: '#F3E5F5', image: require('../assets/banhmi.png') },
    { id: '5', name: 'Dairy & Eggs', color: '#E3F2FD', image: require('../assets/milk.png') },
    { id: '6', name: 'Beverages', color: '#FFF3E0', image: require('../assets/nuocngot.png') },
];

function CategoryCard({ item, onPress }) {
    return (
        <TouchableOpacity
            style={[s.categoryCard, { backgroundColor: item.color }]}
            onPress={() => onPress && onPress(item)}
            activeOpacity={0.82}
        >
            <Image source={item.image} style={s.categoryImg} resizeMode="contain" />
            <Text style={s.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );
}

const tabs = [
    { icon: '🏠', label: 'Shop' },
    { icon: '🔍', label: 'Explore' },
    { icon: '🛒', label: 'Cart' },
    { icon: '❤️', label: 'Favourite' },
    { icon: '👤', label: 'Account' },
];

function BottomTab({ active, setActive, onNavigate }) {
    return (
        <View style={s.bottomTab}>
            {tabs.map((t, i) => (
                <TouchableOpacity key={t.label} style={s.tabItem} onPress={() => {
                    setActive(i);

                    if (i === 0) {
                        onNavigate && onNavigate('home'); // 👈 FIX CHÍNH Ở ĐÂY
                    }

                    if (i === 1) {
                        onNavigate && onNavigate('explore');
                    }
                }}>
                    <Text style={s.tabIcon}>{t.icon}</Text>
                    <Text style={[s.tabLabel, active === i && s.tabLabelActive]}>{t.label}</Text>
                    {active === i && <View style={s.tabDot} />}
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default function ExploreScreen({ onSelectCategory, onNavigate }) {
    const [activeTab, setActiveTab] = useState(1);
    const [searchText, setSearchText] = useState('');

    const filtered = searchText
        ? categories.filter(c => c.name.toLowerCase().includes(searchText.toLowerCase()))
        : categories;

    return (
        <SafeAreaView style={s.safe}>
            <StatusBar barStyle="dark-content" />
            <View style={s.root}>
                <ScrollView
                    style={s.scroll}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 90 }}
                >
                    {/* Header */}
                    <View style={s.header}>
                        <Text style={s.headerTitle}>Find Products</Text>
                    </View>

                    {/* Search bar */}
                    <View style={s.searchBar}>
                        <Text style={s.searchIcon}>🔍</Text>
                        <TextInput
                            style={s.searchInput}
                            placeholder="Search Store"
                            placeholderTextColor="#aaa"
                            value={searchText}
                            onChangeText={setSearchText}
                        />
                    </View>

                    {/* Category grid */}
                    <View style={s.grid}>
                        {filtered.map(item => (
                            <CategoryCard
                                key={item.id}
                                item={item}
                                onPress={() => onSelectCategory && onSelectCategory(item)}
                            />
                        ))}
                    </View>
                </ScrollView>

                <BottomTab
                    active={activeTab}
                    setActive={setActiveTab}
                    onNavigate={onNavigate}
                />
            </View>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    root: { flex: 1 },
    scroll: { flex: 1 },

    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#181725',
    },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginBottom: 20,
        backgroundColor: '#F2F3F2',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    searchIcon: { fontSize: 16, marginRight: 8 },
    searchInput: { flex: 1, fontSize: 14, color: '#222' },

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
        gap: 12,
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '47%',
        height: 170,
        borderRadius: 18,
        justifyContent: 'flex-end',
        padding: 14,
        overflow: 'hidden',
        marginBottom: 4,
    },
    categoryImg: {
        width: 90,
        height: 90,
        position: 'absolute',
        top: 14,
        right: 10,
    },
    categoryName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#181725',
        lineHeight: 20,
    },

    bottomTab: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingBottom: 16,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 12,
    },
    tabItem: { flex: 1, alignItems: 'center', position: 'relative' },
    tabIcon: { fontSize: 20, marginBottom: 2 },
    tabLabel: { fontSize: 11, color: '#aaa', fontWeight: '500' },
    tabLabelActive: { color: GREEN, fontWeight: '700' },
    tabDot: {
        position: 'absolute',
        bottom: -10,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: GREEN,
    },
});