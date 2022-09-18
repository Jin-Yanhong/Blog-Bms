<template>
	<div class="navbar">
		<el-menu class="horizeonMenu" :default-active="activeMenu" mode="horizontal" :ellipsis="false" :unique-opened="true" :background-color="bgColor" :collapse-transition="true" :collapse="false" active-text-color="#ffd04b" text-color="#fff">
			<SidebarItem v-for="route in routerList" :item="route" :basePath="route.path" />
			<div style="flex-grow: 1" />
			<el-dropdown>
				<span class="el-dropdown-link">
					<span class="userCenter"> User Center </span>
					<el-icon class="el-icon--right">
						<arrow-down />
					</el-icon>
				</span>
				<template #dropdown>
					<el-dropdown-menu>
						<!-- <el-dropdown-item divided></el-dropdown-item> -->
						<el-dropdown-item @click="handleLogout">
							<el-icon class="el-icon--right">
								<SwitchButton />
							</el-icon>
							Logout
						</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</el-menu>
	</div>
</template>
<script lang="ts">
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue';
import { routes } from '@/router';
import { memuBgColor } from '@/setting';
import { useUserStore } from '@/store/user';
import { ArrowDown, Document, Menu as IconMenu, Setting, SwitchButton } from '@element-plus/icons-vue';
import { defineComponent } from '@vue/runtime-core';
import { ElMessageBox } from 'element-plus';
export default defineComponent({
	name: 'nav_Bar',
	setup() {
		const routerList = routes;
		const bgColor = memuBgColor;
		const user = useUserStore();
		return {
			bgColor,
			routerList,
			user,
		};
	},
	components: {
		Document,
		IconMenu,
		Setting,
		SidebarItem,
		ArrowDown,
		SwitchButton,
	},
	computed: {
		activeMenu(): string {
			const route = this.$route;
			const path = route.path;
			return path;
		},
	},

	methods: {
		handleLogout(): any {
			ElMessageBox.confirm('Are you confirm to logout ?', 'Warning', {
				confirmButtonText: 'I conform',
				cancelButtonText: 'Cancle',
				type: 'warning',
			}).then(() => {
				this.user.handleLogout();
				location.reload(); // To prevent bugs from vue-router
			});
		},
	},
});
</script>
<style lang="scss" scoped>
@import '@/style/variables.scss';

.navbar {
	background-color: v-bind(bgColor);
	.userCenter {
		color: #fff;
		line-height: 58px;
		cursor: pointer;
	}
}
</style>
