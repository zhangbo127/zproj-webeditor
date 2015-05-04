<div class="we-layeroptbar ui-front" id="we-layeroptbar-text">

	<fieldset>
		<legend>补白</legend>
		<table>
			<tr>
				<td>全部：</td>
				<td>
					<div class="we-slider" data-bind="slider: {value: padding, min: 0, max: 20}"></div>
				</td>
				<td>
					<input class="we-spinner" data-bind="spinner: {value: padding, min: 0, max: 20}, valueUpdate: 'keyup'" type="text"/>
				</td>
			</tr>
		</table>
	</fieldset>

	<fieldset>
		<legend>边框</legend>
		<table>
			<tr>
				<td>上边：</td>
				<td>
					<select class="we-selectmenu" data-bind="value: borderTopStyle, selectmenu: {width: 'auto'}">
						<option value="solid">实线</option>
						<option value="dashed">虚线</option>
						<option value="dotted">点线</option>
						<option value="double">双倍</option>
						<option value="inset">内凹</option>
						<option value="outset">外凸</option>
					</select>
				</td>
				<td>
					<select class="we-selectmenu" data-bind="value: borderTopColor, selectmenu: {width: 'auto'}">
						<option value="white">白色</option>
						<option value="black">黑色</option>
						<option value="red">红色</option>
						<option value="green">绿色</option>
						<option value="blue">蓝色</option>
						<option value="orange">橙色</option>
					</select>
				</td>
				<td>
					<div class="we-slider" data-bind="slider: {value: borderTopWidth, min: 0, max: 20}"></div>
				</td>
				<td>
					<input class="we-spinner" data-bind="spinner: {value: borderTopWidth, min: 0, max: 20}, valueUpdate: 'keyup'"
						   type="text" />
				</td>
			</tr>
			<tr>
				<td>右边：</td>
				<td>
					<select class="we-selectmenu" data-bind="value: borderRightStyle, selectmenu: {width: 'auto'}">
						<option value="solid">实线</option>
						<option value="dashed">虚线</option>
						<option value="dotted">点线</option>
						<option value="double">双倍</option>
						<option value="inset">内凹</option>
						<option value="outset">外凸</option>
					</select>
				</td>
				<td>
					<select class="we-selectmenu" data-bind="value: borderRightColor, selectmenu: {width: 'auto'}">
						<option value="white">白色</option>
						<option value="black">黑色</option>
						<option value="red">红色</option>
						<option value="green">绿色</option>
						<option value="blue">蓝色</option>
						<option value="orange">橙色</option>
					</select>
				</td>
				<td>
					<div class="we-slider" data-bind="slider: {value: borderRightWidth, min: 0, max: 20}"></div>
				</td>
				<td>
					<input class="we-spinner" data-bind="spinner: {value: borderRightWidth, min: 0, max: 20}, valueUpdate: 'keyup'"
						   type="text" />
				</td>
			</tr>
			<tr>
				<td>下边：</td>
				<td>
					<select class="we-selectmenu" data-bind="value: borderBottomStyle, selectmenu: {width: 'auto'}">
						<option value="solid">实线</option>
						<option value="dashed">虚线</option>
						<option value="dotted">点线</option>
						<option value="double">双倍</option>
						<option value="inset">内凹</option>
						<option value="outset">外凸</option>
					</select>
				</td>
				<td>
					<select class="we-selectmenu" data-bind="value: borderBottomColor, selectmenu: {width: 'auto'}">
						<option value="white">白色</option>
						<option value="black">黑色</option>
						<option value="red">红色</option>
						<option value="green">绿色</option>
						<option value="blue">蓝色</option>
						<option value="orange">橙色</option>
					</select>
				</td>
				<td>
					<div class="we-slider" data-bind="slider: {value: borderBottomWidth, min: 0, max: 20}"></div>
				</td>
				<td>
					<input class="we-spinner" data-bind="spinner: {value: borderBottomWidth, min: 0, max: 20}, valueUpdate: 'keyup'"
						   type="text" />
				</td>
			</tr>
			<tr>
				<td>左边：</td>
				<td>
					<select class="we-selectmenu" data-bind="value: borderLeftStyle, selectmenu: {width: 'auto'}">
						<option value="solid">实线</option>
						<option value="dashed">虚线</option>
						<option value="dotted">点线</option>
						<option value="double">双倍</option>
						<option value="inset">内凹</option>
						<option value="outset">外凸</option>
					</select>
				</td>
				<td>
					<select class="we-selectmenu" data-bind="value: borderLeftColor, selectmenu: {width: 'auto'}">
						<option value="white">白色</option>
						<option value="black">黑色</option>
						<option value="red">红色</option>
						<option value="green">绿色</option>
						<option value="blue">蓝色</option>
						<option value="orange">橙色</option>
					</select>
				</td>
				<td>
					<div class="we-slider" data-bind="slider: {value: borderLeftWidth, min: 0, max: 20}"></div>
				</td>
				<td>
					<input class="we-spinner" data-bind="spinner: {value: borderLeftWidth, min: 0, max: 20}, valueUpdate: 'keyup'"
						   type="text" />
				</td>
			</tr>
		</table>
	</fieldset>

	<fieldset>
		<legend>背景</legend>
		<table>
			<tr>
				<td>图片预览</td>
				<td>图片重复</td>
				<td>图片位置</td>
				<td>填充颜色</td>
			</tr>
			<tr>
				<td>
					<img src="error.gif" alt="" width="100" height="100"/>
				</td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</table>
	</fieldset>

	<fieldset>
		<legend>位置大小</legend>
		<table>
			<tr>
				<td>
					x: <input class="we-number" data-bind="value: left, valueUpdate: 'keyup'" type="text"/>
				</td>
				<td>
					y: <input class="we-number" data-bind="value: top, valueUpdate: 'keyup'" type="text"/>
				</td>
				<td>
					z: <input class="we-number" data-bind="value: zIndex, valueUpdate: 'keyup'" type="text"/>
				</td>
				<td>
					w: <input class="we-number" data-bind="value: width, valueUpdate: 'keyup'" type="text"/>
				</td>
				<td>
					h: <input class="we-number" data-bind="value: height, valueUpdate: 'keyup'" type="text"/>
				</td>
			</tr>
		</table>
	</fieldset>

</div>
