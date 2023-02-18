import { get, post } from "@/config/api/http";

/**
 * @description: 获取业务分类列表
 * @return {*}
 */
export const selectClassList = () => get("/helpClassify/selectClassifyList")
/**
 * @description: 获取轮播图
 * @return {*}
 */
export const selectBannerList = () => get("/banner/selectBannerList", { classify: 1, state: 1 })
/**
 * @description: 最新任务
 * @return {*}
 */
export const selectNewHelpOrderList = () => get("/help/selectNewHelpOrderList", { page: 1, limit: 10, campus: 12 })

/**
 * @description: 分类任务
 * @return {*}
 */
export const selectHelpOrderByClassifyList = classifyId => get("/help/selectHelpOrderByClassifyList", { classifyId, page: 1, limit: 10, campus: 12 })
/**
 * @description: 学校列表
 * @return {*}
 */
export const selectCampusList = localCampus => get("/helpCampus/selectCampusList", { localCampus })

/**
 * @description: 登录
 * @return {*}
 */
export const login = userInfo => post("/appLogin/login", userInfo)

/**
 * @description: 获取登录用户信息
 * @return {*}
 */
export const getUserInfo = userId => post(`/app/selectUserById?userId=${userId}`)

/**
 * @description: 获取发布订单
 * @return {*}
 * @param {*} userId 
 * @param {*} status
 */
export const selectCreateHelpOrder = (userId, status) => get(`/help/selectCreateHelpOrder?userId=${userId}&status=${status + 2}&page=1&limit=10`)
/**
 * @description: 获取跑腿订单
 * @return {*}
 * @param {*} userId 
 * @param {*} status
 */
export const selectRunHelpOrder = (userId, status) => get(`/help/selectRunHelpOrder?userId=${userId}&status=${status}&page=1&limit=10`)






