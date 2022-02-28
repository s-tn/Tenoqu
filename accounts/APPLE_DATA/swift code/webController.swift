
import SwiftUI
import UIKit
import PlaygroundSupport

struct ContentView: View {
    var body: some View {
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
        .overlay(HStack {
            Text("9:41")
                .font(Font.system(.body, design: .default).weight(.medium))
                .frame(width: 44)
                .clipped()
            Spacer()
            HStack(alignment: .bottom, spacing: 6) {
                HStack(alignment: .bottom, spacing: 2) {
                    RoundedRectangle(cornerRadius: 4, style: .continuous)
                        .frame(width: 3.5, height: 6)
                        .clipped()
                    RoundedRectangle(cornerRadius: 2, style: .continuous)
                        .frame(width: 3.5, height: 8)
                        .clipped()
                    RoundedRectangle(cornerRadius: 2, style: .continuous)
                        .frame(width: 3.5, height: 10)
                        .clipped()
                    RoundedRectangle(cornerRadius: 2, style: .continuous)
                        .frame(width: 3.5, height: 12)
                        .clipped()
                }
                .padding(.trailing, 1)
                Image(systemName: "wifi")
                    .imageScale(.medium)
                    .font(.subheadline)
                Image(systemName: "battery.100")
                    .imageScale(.medium)
                    .font(.system(size: 18, weight: .light, design: .default))
            }
        }
        .padding(.leading, 27)
        .padding(.trailing, 9)
        .padding(.horizontal)
        .padding(.top)
        .padding(.bottom, 10)
        .background(Rectangle()
            .fill(Color(.systemBackground)), alignment: .center), alignment: .top)
        .overlay(HStack(spacing: 10) {
            VStack(spacing: 4) {
                Image(systemName: "star.fill")
                    .imageScale(.large)
                    .frame(maxHeight: .infinity)
                    .clipped()
                Text("Favorites")
                    .font(.caption2)
            }
            .foregroundColor(Color.secondary)
            .frame(maxWidth: .infinity, alignment: .center)
            .clipped()
            VStack(spacing: 4) {
                Image(systemName: "clock.fill")
                    .imageScale(.large)
                    .frame(maxHeight: .infinity)
                    .clipped()
                Text("Recents")
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
                Text("Contacts")
                    .font(.caption2)
            }
            .foregroundColor(Color.blue)
            .frame(maxWidth: .infinity, alignment: .center)
            .clipped()
            VStack(spacing: 4) {
                Image(systemName: "circle.grid.3x3.fill")
                    .imageScale(.large)
                    .frame(maxHeight: .infinity)
                    .clipped()
                Text("Numpad")
                    .font(.caption2)
            }
            .foregroundColor(Color.secondary)
            .frame(maxWidth: .infinity, alignment: .center)
            .clipped()
            VStack(spacing: 4) {
                Image(systemName: "recordingtape")
                    .imageScale(.large)
                    .frame(maxHeight: .infinity)
                    .clipped()
                Text("Voicemail")
                    .font(.caption2)
            }
            .foregroundColor(Color.secondary)
            .frame(maxWidth: .infinity, alignment: .center)
            .clipped()
        }
        .padding(.bottom, 34)
        .padding(.horizontal, 15)
        .padding(.top, 5)
        .background(VStack(spacing: 0) {
            Divider()
            VisualEffectView(style: .systemMaterial)
        }, alignment: .center)
        .frame(maxHeight: 84)
        .clipped(), alignment: .bottom)
        .frame(width: 390, height: 844)
        .clipped()
        .background(Color(.systemBackground))
        .cornerRadius(43)
    }
}

struct VisualEffectView: UIViewRepresentable {
    let style: UIBlurEffect.Style
    
    func makeUIView(context: Context) -> UIVisualEffectView {
        return UIVisualEffectView(effect: UIBlurEffect(style: style))
    }
    
    func updateUIView(_ uiView: UIVisualEffectView, context: Context) {
        uiView.effect = UIBlurEffect(style: style)
    }
}

PlaygroundPage.current.setLiveView(ContentView())
