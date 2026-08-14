#![cfg_attr(
	all(
		not(debug_assertions), 
		target_os = "windows"
	),
	windows_subsystem = "windows"
)]

use std::env;
use std::os::windows::process::CommandExt;
use std::process::Command;

use windows_sys::Win32::System::Threading::CREATE_NO_WINDOW;

fn main() -> Result<(), String> {
	
	let mut exe_path = env::current_exe()
		.map_err(|error| error.to_string())?;

	exe_path.pop();
	exe_path.push("StardewModdingAPI.exe");

	if exe_path.exists() {
		Command::new(exe_path)
			.creation_flags(CREATE_NO_WINDOW)
			.spawn()
			.map_err(|error| error.to_string())?;
	}

	Ok(())
}
