ScrollView(.vertical, showsIndicators: true) {
	VStack {
		Text("Art Gallery")
			.font(Font.system(.largeTitle, design: .default).weight(.semibold))
			.frame(maxWidth: .infinity, alignment: .leading)
			.clipped()
			.padding(.leading)
			.padding(.top, 90)
			.padding(.bottom)
	}
	.frame(maxWidth: .infinity)
	.clipped()
}
.frame(maxWidth: .infinity, maxHeight: .infinity)
.clipped()
.overlay(Group {
	EmptyView()
}, alignment: .top)
.overlay(Group {
	HStack(spacing: 10) {
		VStack(spacing: 4) {
			Image(systemName: "star.fill")
				.imageScale(.large)
				.frame(maxHeight: .infinity)
				.clipped()
			Text("Friends")
				.font(.caption2)
		}
		.foregroundColor(Color(.quarternaryLabel))
		.frame(maxWidth: .infinity, alignment: .center)
		.clipped()
		VStack(spacing: 4) {
			Image(systemName: "tray")
				.imageScale(.large)
				.frame(maxHeight: .infinity)
				.clipped()
			Text("Servers")
				.font(.caption2)
		}
		.foregroundColor(Color.secondary)
		.frame(maxWidth: .infinity, alignment: .center)
		.clipped()
		VStack(spacing: 4) {
			Image(systemName: "person.crop.circle.fill")
				.imageScale(.large)
				.frame(maxHeight: .infinity)
				.clipped()
			Text("Friends")
				.font(.caption2)
		}
		.foregroundColor(Color.blue)
		.frame(maxWidth: .infinity, alignment: .center)
		.clipped()
		VStack(spacing: 4) {
			Image(systemName: "gear")
				.imageScale(.large)
				.frame(maxHeight: .infinity)
				.clipped()
			Text("Settings")
				.font(.caption2)
		}
		.foregroundColor(Color.secondary)
		.frame(maxWidth: .infinity, alignment: .center)
		.clipped()
	}
	.padding(.trailing, 34)
	.padding(.bottom, 15)
	.padding(.top, 5)
	.background(VStack(spacing: 0) {
		Divider()
	}, alignment: .top)
	.frame(maxHeight: 84, alignment: .bottom)
	.clipped()
	.foregroundColor(Color.orange)
	HStack(spacing: 10) {
		VStack(spacing: 4) {
			Image(systemName: "star.fill")
				.imageScale(.large)
				.frame(maxHeight: .infinity)
				.clipped()
			Text("Friends")
				.font(.caption2)
		}
		.foregroundColor(Color.secondary)
		.frame(maxWidth: .infinity, alignment: .center)
		.clipped()
		VStack(spacing: 4) {
			Image(systemName: "tray")
				.imageScale(.large)
				.frame(maxHeight: .infinity)
				.clipped()
			Text("Servers")
				.font(.caption2)
		}
		.foregroundColor(Color.secondary)
		.frame(maxWidth: .infinity, alignment: .center)
		.clipped()
		VStack(spacing: 4) {
			Image(systemName: "person.crop.circle.fill")
				.imageScale(.large)
				.frame(maxHeight: .infinity)
				.clipped()
			Text("Friends")
				.font(.caption2)
		}
		.foregroundColor(Color.blue)
		.frame(maxWidth: .infinity, alignment: .center)
		.clipped()
		VStack(spacing: 4) {
			Image(systemName: "gear")
				.imageScale(.large)
				.frame(maxHeight: .infinity)
				.clipped()
			Text("Settings")
				.font(.caption2)
		}
		.foregroundColor(Color.secondary)
		.frame(maxWidth: .infinity, alignment: .center)
		.clipped()
	}
	.padding(.trailing, 34)
	.padding(.bottom, 15)
	.padding(.top, 5)
	.background(VStack(spacing: 0) {
		Divider()
	}, alignment: .top)
	.frame(maxHeight: 84, alignment: .bottom)
	.clipped()
	.foregroundColor(Color.orange)
}, alignment: .top)