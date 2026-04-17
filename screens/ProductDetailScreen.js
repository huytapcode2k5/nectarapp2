// screens/ProductDetailScreen.js
import React, { useState } from 'react';
import {
    View, Text, StyleSheet, ScrollView, TouchableOpacity,
    SafeAreaView, StatusBar, Dimensions, Image,
} from 'react-native';

const { width } = Dimensions.get('window');
const GREEN = '#5DAF6A';

export default function ProductDetailScreen({ onBack }) {
    const [quantity, setQuantity] = useState(1);
    const [wished, setWished] = useState(false);
    const [detailOpen, setDetailOpen] = useState(true);
    const [nutritionOpen, setNutritionOpen] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);

    // Thay đường dẫn ảnh theo đúng file của bạn
    const images = [
        require('../assets/apple.png'),
        require('../assets/apple2.png'),
        require('../assets/apple3.png'),
    ];

    return (
        <SafeAreaView style={s.safe}>
            <StatusBar barStyle="dark-content" />

            {/* ── Top bar ── */}
            <View style={s.topBar}>
                <TouchableOpacity style={s.iconBtn} onPress={onBack}>
                    <Text style={s.iconText}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.iconBtn}>
                    <Text style={s.iconText}>⎙</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* ── Image carousel ── */}
                <View style={s.imageArea}>
                    <View style={s.imageBg}>
                        <Image
                            source={images[imgIndex]}
                            style={s.productImg}
                            resizeMode="contain"
                        />
                    </View>
                    {/* Dots */}
                    <View style={s.dots}>
                        {images.map((_, i) => (
                            <TouchableOpacity key={i} onPress={() => setImgIndex(i)}>
                                <View style={[s.dot, imgIndex === i && s.dotActive]} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* ── Product info ── */}
                <View style={s.body}>

                    {/* Name + wishlist */}
                    <View style={s.nameRow}>
                        <View>
                            <Text style={s.productName}>Naturel Red Apple</Text>
                            <Text style={s.productDesc}>1kg, Price</Text>
                        </View>
                        <TouchableOpacity onPress={() => setWished(!wished)} style={s.wishBtn}>
                            <Text style={[s.wishIcon, wished && s.wishActive]}>
                                {wished ? '♥' : '♡'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Quantity + price */}
                    <View style={s.qtyRow}>
                        <TouchableOpacity
                            style={s.qtyBtn}
                            onPress={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                            <Text style={s.qtyBtnText}>−</Text>
                        </TouchableOpacity>

                        <Text style={s.qtyNum}>{quantity}</Text>

                        <TouchableOpacity
                            style={[s.qtyBtn, s.qtyBtnPlus]}
                            onPress={() => setQuantity(q => q + 1)}
                        >
                            <Text style={[s.qtyBtnText, { color: '#fff' }]}>+</Text>
                        </TouchableOpacity>

                        <Text style={s.price}>${(4.99 * quantity).toFixed(2)}</Text>
                    </View>

                    <View style={s.divider} />

                    {/* ── Accordion: Product Detail ── */}
                    <TouchableOpacity style={s.accordion} onPress={() => setDetailOpen(o => !o)}>
                        <Text style={s.accordionTitle}>Product Detail</Text>
                        <Text style={s.accordionArrow}>{detailOpen ? '∧' : '∨'}</Text>
                    </TouchableOpacity>
                    {detailOpen && (
                        <Text style={s.accordionBody}>
                            Apples Are Nutritious. Apples May Be Good For Weight Loss.
                            Apples May Be Good For Your Heart. As Part Of A Healthy
                            And Varied Diet.
                        </Text>
                    )}

                    <View style={s.divider} />

                    {/* ── Accordion: Nutritions ── */}
                    <TouchableOpacity style={s.accordion} onPress={() => setNutritionOpen(o => !o)}>
                        <Text style={s.accordionTitle}>Nutritions</Text>
                        <View style={s.row}>
                            <View style={s.kcalBadge}>
                                <Text style={s.kcalText}>100gr</Text>
                            </View>
                            <Text style={[s.accordionArrow, { marginLeft: 8 }]}>{nutritionOpen ? '∧' : '∨'}</Text>
                        </View>
                    </TouchableOpacity>
                    {nutritionOpen && (
                        <View style={s.nutritionTable}>
                            {[
                                ['Calories', '52 kcal'],
                                ['Carbs', '13.8 g'],
                                ['Fiber', '2.4 g'],
                                ['Protein', '0.3 g'],
                                ['Fat', '0.2 g'],
                            ].map(([label, val]) => (
                                <View key={label} style={s.nutritionRow}>
                                    <Text style={s.nutritionLabel}>{label}</Text>
                                    <Text style={s.nutritionVal}>{val}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={s.divider} />

                    {/* ── Accordion: Review ── */}
                    <TouchableOpacity style={s.accordion} onPress={() => setReviewOpen(o => !o)}>
                        <Text style={s.accordionTitle}>Review</Text>
                        <View style={s.row}>
                            <StarRow rating={4} />
                            <Text style={[s.accordionArrow, { marginLeft: 8 }]}>{reviewOpen ? '∧' : '∨'}</Text>
                        </View>
                    </TouchableOpacity>
                    {reviewOpen && (
                        <View>
                            {[
                                { name: 'John D.', stars: 5, text: 'Very fresh and delicious!' },
                                { name: 'Sara M.', stars: 4, text: 'Good quality, will buy again.' },
                            ].map(r => (
                                <View key={r.name} style={s.reviewCard}>
                                    <View style={s.reviewTop}>
                                        <Text style={s.reviewName}>{r.name}</Text>
                                        <StarRow rating={r.stars} />
                                    </View>
                                    <Text style={s.reviewText}>{r.text}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>

            {/* ── Add to Basket ── */}
            <View style={s.footer}>
                <TouchableOpacity style={s.basketBtn}>
                    <Text style={s.basketText}>Add To Basket</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

function StarRow({ rating }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            {[1, 2, 3, 4, 5].map(i => (
                <Text key={i} style={{ fontSize: 14, color: i <= rating ? '#F4A636' : '#ddd' }}>★</Text>
            ))}
        </View>
    );
}

const s = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },

    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    iconBtn: {
        width: 40, height: 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: { fontSize: 22, color: '#333', fontWeight: '300' },

    imageArea: { alignItems: 'center', paddingVertical: 12 },
    imageBg: {
        width: width,
        height: 260,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
    },
    productImg: { width: 220, height: 220 },
    dots: { flexDirection: 'row', marginTop: 12, gap: 6 },
    dot: {
        width: 8, height: 8,
        borderRadius: 4,
        backgroundColor: '#E0E0E0',
    },
    dotActive: { backgroundColor: GREEN, width: 20 },

    body: { paddingHorizontal: 20, paddingTop: 8 },

    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    productName: { fontSize: 22, fontWeight: '800', color: '#181725' },
    productDesc: { fontSize: 14, color: '#7C7C7C', marginTop: 4 },
    wishBtn: {
        width: 38, height: 38,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wishIcon: { fontSize: 20, color: '#ccc' },
    wishActive: { color: '#F4436C' },

    qtyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    qtyBtn: {
        width: 40, height: 40,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E2E2E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyBtnPlus: {
        backgroundColor: GREEN,
        borderColor: GREEN,
        shadowColor: GREEN,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    qtyBtnText: { fontSize: 20, color: '#555', fontWeight: '500', lineHeight: 24 },
    qtyNum: { fontSize: 18, fontWeight: '700', color: '#181725', marginHorizontal: 16 },
    price: {
        marginLeft: 'auto',
        fontSize: 24,
        fontWeight: '800',
        color: '#181725',
    },

    divider: { height: 1, backgroundColor: '#F2F3F2', marginVertical: 4 },

    accordion: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    accordionTitle: { fontSize: 16, fontWeight: '700', color: '#181725' },
    accordionArrow: { fontSize: 16, color: '#888' },
    accordionBody: {
        fontSize: 13,
        color: '#7C7C7C',
        lineHeight: 20,
        paddingBottom: 12,
    },

    row: { flexDirection: 'row', alignItems: 'center' },

    kcalBadge: {
        backgroundColor: '#F2F3F2',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    kcalText: { fontSize: 12, color: '#7C7C7C', fontWeight: '600' },

    nutritionTable: { paddingBottom: 12 },
    nutritionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#F7F7F7',
    },
    nutritionLabel: { fontSize: 13, color: '#7C7C7C' },
    nutritionVal: { fontSize: 13, fontWeight: '700', color: '#181725' },

    reviewCard: {
        backgroundColor: '#F8F8F8',
        borderRadius: 12,
        padding: 14,
        marginBottom: 10,
    },
    reviewTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    reviewName: { fontSize: 14, fontWeight: '700', color: '#181725' },
    reviewText: { fontSize: 13, color: '#7C7C7C', lineHeight: 18 },

    footer: {
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 28,
        borderTopWidth: 1,
        borderTopColor: '#F2F3F2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 10,
    },
    basketBtn: {
        backgroundColor: GREEN,
        borderRadius: 16,
        paddingVertical: 17,
        alignItems: 'center',
        shadowColor: GREEN,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    basketText: { color: '#fff', fontSize: 17, fontWeight: '700', letterSpacing: 0.3 },
});