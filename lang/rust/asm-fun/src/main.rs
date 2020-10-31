// -- This is the old rust way
//
// #![feature(llvm_asm)]
//
// #[cfg(any(target_arch = "x86", target_arch = "x86_64"))]
// fn add(a: i64, b: i64) -> i64 {
//     let result: i64;
//     unsafe {
//         llvm_asm!("add $2, $0"
//              : "=r"(result)
//              : "0"(a), "r"(b)
//         );
//     }
//     return result
// }

// -- This is the new one
#![feature(asm)]
#[cfg(any(target_arch = "x86", target_arch = "x86_64"))]
fn add(a: i64, b: i64) -> i64 {
    let mut result: i64 = a;
    unsafe {
        asm!("add {}, {}",
            inout (reg) result, in (reg) b
        );
    }
    return result
}

fn main() {
    println!("{}", add(1,2));
}
